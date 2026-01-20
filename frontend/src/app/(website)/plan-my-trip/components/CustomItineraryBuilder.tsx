"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Calendar, Loader2, Sparkles, Check, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Destination } from "../../destinations/schema";
import { Experience } from "../../experiences/schema";
import { Hotel } from "../../../admin/hotels/schema";
import { Cost } from "../../../admin/settings/schema";
import { DayItinerary, ItineraryItem } from "@/app/admin/tour-requests/types";
import { DayBuilder } from "./builder/DayBuilder";
import { ExperienceSelector } from "./builder/ExperienceSelector";
import { TravelSelector } from "./builder/TravelSelector";
import { HotelSelector } from "./builder/HotelSelector";
import { submitTourRequest } from "../actions";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTravelTime } from "@/constants/travel-times";

function generateId() {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

interface CustomItineraryBuilderProps {
    experiences: Experience[];
    destinations: Destination[];
    hotels: Hotel[];
    costs: Cost[];
    onBack: () => void;
}

type BuilderStep = "INFORMATION" | "ENTRY_POINT" | "BUILDER" | "SUCCESS";

export function CustomItineraryBuilder({
    experiences = [],
    destinations = [],
    hotels = [],
    costs = [],
    onBack
}: CustomItineraryBuilderProps) {
    const [step, setStep] = useState<BuilderStep>("INFORMATION");

    // Builder State
    const [days, setDays] = useState<DayItinerary[]>([
        { day: 1, items: [] } // Start with Day 1
    ]);
    const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);
    const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
    const [showExperienceSelector, setShowExperienceSelector] = useState(false);
    const [showTravelSelector, setShowTravelSelector] = useState(false);
    const [showHotelSelector, setShowHotelSelector] = useState(false);
    const [showDestinationChangeGrid, setShowDestinationChangeGrid] = useState(false);

    // Form State
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nationality: "International" as "Indian" | "International",
        adults: 1,
        children_6_12: 0,
        children_under_6: 0,
        arrivalDate: "",
        departureDate: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Logic Helpers ---

    const calculateFees = () => {
        if (!userDetails.arrivalDate || !userDetails.departureDate) return { total: 0, breakDown: [] };

        const start = new Date(userDetails.arrivalDate);
        const end = new Date(userDetails.departureDate);
        const nights = Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
        const daysCount = nights + 1;

        let feeTotal = 0;
        const items: { label: string, price: number }[] = [];

        (costs || []).forEach(cost => {
            if (cost.isIndianNational === (userDetails.nationality === "Indian")) {
                let count = 0;
                if (cost.travelerCategory === "adult") count = userDetails.adults;
                else if (cost.travelerCategory === "child_6_12") count = userDetails.children_6_12;
                else if (cost.travelerCategory === "child_under_6") count = userDetails.children_under_6;

                if (count > 0) {
                    const base = cost.price * count;
                    const totalForItem = cost.type === "daily" ? base * daysCount : base;
                    feeTotal += totalForItem;
                    items.push({ label: `${cost.title} (${count}x)`, price: totalForItem });
                }
            }
        });

        return { total: feeTotal, breakDown: items };
    };

    const calculateTotalCost = () => {
        const { total: fees } = calculateFees();
        let itemsTotal = 0;

        (days || []).forEach(day => {
            (day.items || []).forEach(item => {
                if (item.experienceId) {
                    const exp = (experiences || []).find(e => e._id === item.experienceId || e.slug === item.experienceId) as any;
                    itemsTotal += (exp?.price || 0);
                }
                if (item.hotelId) {
                    const hotel = (hotels || []).find(h => h._id === item.hotelId || h.slug === item.hotelId) as any;
                    itemsTotal += (hotel?.price || 0);
                }
            });
        });

        return fees + itemsTotal;
    };

    // --- Builder Logic ---

    const addDay = () => {
        setDays([...days, { day: days.length + 1, items: [] }]);
    };

    const removeDay = (index: number) => {
        if (days.length <= 1) return;
        const newDays = days.filter((_, i) => i !== index)
            .map((day, i) => ({ ...day, day: i + 1 })); // Renumber
        setDays(newDays);
    };

    const addExperienceToDay = (dayIndex: number, experience: Experience) => {
        const newDays = [...days];
        const newItem: ItineraryItem = {
            id: generateId(),
            type: "experience",
            order: newDays[dayIndex].items.length,
            experienceId: experience._id || experience.slug,
            experience: {
                title: experience.title,
                duration: experience.duration || "2 Hours",
                image: experience.image
            }
        };
        newDays[dayIndex].items.push(newItem);
        setDays(newDays);
        setShowExperienceSelector(false);
    };

    const getDestinationAtPoint = (dayIndex: number, itemIndex?: number) => {
        // Search backwards from the specified point
        for (let i = dayIndex; i >= 0; i--) {
            const items = days[i].items;
            const startSearch = (i === dayIndex && itemIndex !== undefined) ? itemIndex - 1 : items.length - 1;

            for (let j = startSearch; j >= 0; j--) {
                const item = items[j];
                if (item.type === "travel" && item.travel?.to) {
                    return destinations.find(d => d.name === item.travel?.to) || null;
                }
            }
        }
        return activeDestination;
    };

    const addTravelBetweenDestinations = (dayIndex: number, toDest: Destination) => {
        const fromDest = getDestinationAtPoint(dayIndex) || activeDestination;
        const duration = fromDest ? getTravelTime(fromDest.name, toDest.name) : 0;

        const newDays = [...days];
        const newItem: ItineraryItem = {
            id: generateId(),
            type: "travel",
            order: newDays[dayIndex].items.length,
            destinationFromId: fromDest?._id || fromDest?.slug,
            destinationToId: toDest._id || toDest.slug,
            travel: {
                from: fromDest?.name || "Previous Location",
                to: toDest.name,
                duration: duration
            }
        };
        newDays[dayIndex].items.push(newItem);
        setDays(newDays);
        setActiveDestination(toDest);
        setShowDestinationChangeGrid(false);
    };

    const addHotelToDay = (dayIndex: number, hotel: any) => {
        const newDays = [...days];

        // Check if day already has a hotel
        const hasHotel = newDays[dayIndex].items.some(item => item.hotelId);
        if (hasHotel) {
            toast.error("Only one hotel per day allowed");
            return;
        }

        const newItem: ItineraryItem = {
            id: generateId(),
            type: "travel", // Mixed type but with hotelId
            order: newDays[dayIndex].items.length,
            hotelId: hotel._id || hotel.slug,
            hotel: {
                name: hotel.name,
                image: hotel.image
            }
        };
        newDays[dayIndex].items.push(newItem);
        setDays(newDays);
        setShowHotelSelector(false);

        // Auto-create next day if this is the last day
        if (dayIndex === days.length - 1) {
            setDays(prev => [...prev, {
                day: prev.length + 1,
                items: []
            }]);
        }
    };

    const removeItemFromDay = (dayIndex: number, itemId: string) => {
        const newDays = [...days];
        newDays[dayIndex].items = newDays[dayIndex].items.filter(item => item.id !== itemId);
        setDays(newDays);
    };

    const reorderItemsInDay = (dayIndex: number, items: ItineraryItem[]) => {
        const newDays = [...days];
        newDays[dayIndex].items = items;
        setDays(newDays);
    };

    const calculateDayHours = (items: ItineraryItem[]) => {
        return items.reduce((total, item) => {
            if (item.type === "travel") return total + (item.travel?.duration || 0);
            if (item.type === "experience") {
                // Parse duration string "X Hours" or similar
                const durationStr = item.experience?.duration || "";
                const match = durationStr.match(/(\d+(\.\d+)?)/);
                return total + (match ? parseFloat(match[0]) : 2); // Default 2 hours
            }
            return total;
        }, 0);
    };

    const validateItinerary = () => {
        for (const day of days) {
            if (day.items.length === 0) return { valid: false, message: `Day ${day.day} is empty.` };
            if (calculateDayHours(day.items) > 18) return { valid: false, message: `Day ${day.day} exceeds 18 hours limit.` };
        }
        return { valid: true };
    };

    // --- Submission Logic ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...userDetails,
            tourName: "Custom Bespoke Itinerary",
            status: "pending",
            travelDate: "Custom Dates", // Or add field
            customItinerary: days,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const result = await submitTourRequest(payload);

        if (result.success) {
            setStep("SUCCESS");
        } else {
            toast.error("Failed to submit request.");
        }
        setIsSubmitting(false);
    };

    if (step === "SUCCESS") {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto text-center py-24 space-y-8">
                <div className="w-24 h-24 border border-green-600/30 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <Check className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-light uppercase tracking-tight text-black">Itinerary <span className="italic normal-case text-amber-600">Submitted</span></h2>
                <p className="text-gray-500">Our team will review your bespoke design and contact you shortly.</p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-amber-600 transition-colors"
                >
                    Return Home
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full container mx-auto pb-24"
        >
            {/* Header */}
            <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
                <div className="space-y-4">
                    <span className="font-mono text-amber-600 text-[10px] uppercase tracking-[0.5em] font-bold block">
                        // bespoke architecture
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase leading-none text-black">
                        Planner <span className="italic font-serif normal-case text-amber-600">Studio</span>
                    </h2>
                </div>
                <div className="flex gap-4">
                    {step !== "INFORMATION" && (
                        <button
                            onClick={() => {
                                if (step === "ENTRY_POINT") setStep("INFORMATION");
                                if (step === "BUILDER") setStep("ENTRY_POINT");
                            }}
                            className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            ← Back
                        </button>
                    )}
                    <button onClick={onBack} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
                        Exit Studio
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === "INFORMATION" ? (
                    <motion.div
                        key="information"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-3xl mx-auto space-y-12"
                    >
                        <div className="bg-amber-50/50 p-8 rounded-xl border border-amber-100 mb-8">
                            <div className="flex items-center gap-4 text-amber-900 mb-4">
                                <Sparkles className="w-5 h-5" />
                                <h3 className="text-sm font-bold uppercase tracking-widest">Bespoke Information Gathering</h3>
                            </div>
                            <p className="text-sm text-amber-800/80 leading-relaxed font-light italic serif">
                                To architect the most resonant journey and provide accurate estimations, we require the specific frequency of your delegation.
                            </p>
                        </div>

                        <div className="space-y-16">
                            {/* Personal Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <FormInput
                                    label="Given Name"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={userDetails.firstName}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                                />
                                <FormInput
                                    label="Family Name"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={userDetails.lastName}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                                />
                                <FormInput
                                    label="Digital Address"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={userDetails.email}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, email: e.target.value })}
                                />
                                <FormInput
                                    label="Mobile Connection"
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={userDetails.phone}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, phone: e.target.value })}
                                />
                            </div>

                            {/* Nationality & Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
                                <div className="space-y-4 group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black group-focus-within:text-amber-600 transition-colors">
                                        Nationality
                                    </label>
                                    <Select
                                        value={userDetails.nationality}
                                        onValueChange={(value: "Indian" | "International") => setUserDetails({ ...userDetails, nationality: value })}
                                    >
                                        <SelectTrigger className="w-full border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-amber-600 transition-all bg-transparent rounded-none h-auto px-0">
                                            <SelectValue placeholder="Select nationality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Indian">Indian National</SelectItem>
                                            <SelectItem value="International">Other National</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <FormInput
                                    label="Arrival Date"
                                    name="arrivalDate"
                                    type="date"
                                    value={userDetails.arrivalDate}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, arrivalDate: e.target.value })}
                                />
                                <FormInput
                                    label="Departure Date"
                                    name="departureDate"
                                    type="date"
                                    value={userDetails.departureDate}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, departureDate: e.target.value })}
                                />
                            </div>

                            {/* Travelers Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 bg-neutral-50 p-8 rounded-lg border border-neutral-100">
                                <FormInput
                                    label="Adults (12+)"
                                    name="adults"
                                    type="number"
                                    min={1}
                                    value={userDetails.adults}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, adults: parseInt(e.target.value) || 1 })}
                                />
                                <FormInput
                                    label="Children (6-12)"
                                    name="children_6_12"
                                    type="number"
                                    min={0}
                                    value={userDetails.children_6_12}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, children_6_12: parseInt(e.target.value) || 0 })}
                                />
                                <FormInput
                                    label="Infants (< 6)"
                                    name="children_under_6"
                                    type="number"
                                    min={0}
                                    value={userDetails.children_under_6}
                                    onChange={(e: any) => setUserDetails({ ...userDetails, children_under_6: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            {/* Narrative */}
                            <div className="space-y-4 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black group-focus-within:text-amber-600 transition-colors font-mono">
                                    // Narrative & Special Requirements
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={userDetails.message}
                                    onChange={e => setUserDetails({ ...userDetails, message: e.target.value })}
                                    className="w-full border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-amber-600 transition-all bg-transparent rounded-none resize-none placeholder:text-gray-300 italic serif"
                                    placeholder="Any dietary restrictions, physical limitations, or special occasions?"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    if (!userDetails.firstName || !userDetails.lastName || !userDetails.email || !userDetails.arrivalDate || !userDetails.departureDate) {
                                        toast.error("Please fill in all required fields.");
                                        return;
                                    }
                                    setStep("ENTRY_POINT");
                                }}
                                className="group relative w-full overflow-hidden bg-black py-8 text-white text-[10px] font-bold uppercase tracking-[0.5em] transition-all hover:bg-amber-600"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-6">
                                    Continue to Entry Point <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-amber-500 transition-transform duration-700 ease-in-out" />
                            </button>
                        </div>
                    </motion.div>
                ) : step === "ENTRY_POINT" ? (
                    <motion.div
                        key="entry-point"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        <div className="text-center space-y-4 mb-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-600 font-mono">// spatial initialization</span>
                            <h3 className="text-4xl font-light uppercase tracking-tight text-black">Select Your <span className="italic normal-case text-amber-600">Entry Point</span></h3>
                            <p className="text-gray-500 max-w-xl mx-auto font-light">Your choice of entry determines the initial coordinates of your Bhutanese narrative.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {destinations.filter(d => ["Paro", "Phuentsholing", "Samdrup Jongkhar", "Gelephu"].some(name => d.name.includes(name))).map((dest) => (
                                <button
                                    key={dest._id}
                                    onClick={() => {
                                        const entryItem: ItineraryItem = {
                                            id: generateId(),
                                            type: "travel",
                                            order: 0,
                                            destinationToId: dest._id || dest.slug,
                                            travel: {
                                                from: "Entry Point",
                                                to: dest.name,
                                                duration: 0
                                            }
                                        };
                                        setDays([{ day: 1, items: [entryItem] }]);
                                        setActiveDestination(dest);
                                        setStep("BUILDER");
                                    }}
                                    className="group relative overflow-hidden bg-white aspect-video rounded-lg border border-neutral-100 hover:border-amber-600 transition-all shadow-sm hover:shadow-xl"
                                >
                                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-left">
                                        <h4 className="text-2xl font-light uppercase tracking-tight text-white group-hover:text-amber-600 transition-colors">{dest.name}</h4>
                                        <p className="text-[10px] text-white/60 uppercase tracking-[0.4em] font-bold mt-2">Initialize at this coordinate</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : step === "BUILDER" ? (
                    <motion.div
                        key="builder"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                    >
                        {/* Sidebar: Cost Summary */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-black text-white p-8 rounded-lg shadow-2xl">
                                    <div className="flex items-center gap-3 mb-8 text-amber-500">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Estimated Investment</span>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                            <span className="text-white/60 text-xs uppercase tracking-widest font-mono">// Total Estimate</span>
                                            <span className="text-4xl font-light tracking-tighter text-amber-500">
                                                ${calculateTotalCost().toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {calculateFees().breakDown.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-xs">
                                                    <span className="text-white/40">{item.label}</span>
                                                    <span className="text-white/80">${item.price.toLocaleString()}</span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between text-xs pt-4 border-t border-white/5">
                                                <span className="text-white/40">Activities & Hotels</span>
                                                <span className="text-white/80">${(calculateTotalCost() - calculateFees().total).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={async () => {
                                            const validation = validateItinerary();
                                            if (validation.valid) {
                                                await handleSubmit(new Event('submit') as any);
                                            } else {
                                                toast.error(validation.message);
                                            }
                                        }}
                                        disabled={isSubmitting}
                                        className="w-full mt-12 bg-amber-600 hover:bg-amber-500 py-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4"
                                    >
                                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initiate Request"}
                                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </div>

                                <div className="bg-neutral-50 p-6 rounded border border-neutral-100 italic serif text-sm text-gray-500 leading-relaxed">
                                    "This estimation includes SDF, accommodation, and curated experiences. Final pricing may vary based on specific hotel availability and seasonality."
                                </div>
                            </div>
                        </div>

                        {/* Main Builder Area */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Destination Header */}
                            <div className="flex items-center justify-between p-8 bg-white border border-neutral-100 rounded-lg shadow-sm">
                                <div className="flex items-center gap-6">
                                    {activeDestination && (
                                        <img src={activeDestination.image} className="w-16 h-16 rounded-full object-cover ring-2 ring-amber-500/20" alt="" />
                                    )}
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 font-mono">// active coordinates</span>
                                        <h4 className="text-2xl font-light uppercase tracking-tight text-black">{activeDestination?.name}</h4>
                                    </div>
                                </div>
                            </div>

                            {/* Days Timeline */}
                            <div className="space-y-8">
                                {days.map((day, index) => (
                                    <div key={day.day} className="relative group">
                                        <DayBuilder
                                            day={day}
                                            totalHours={calculateDayHours(day.items)}
                                            isValid={calculateDayHours(day.items) <= 18}
                                            hasHotel={day.items.some(item => !!item.hotelId)}
                                            onAddExperience={() => {
                                                setActiveDayIndex(index);
                                                setShowExperienceSelector(true);
                                            }}
                                            onAddTravel={() => {
                                                setActiveDayIndex(index);
                                                setShowDestinationChangeGrid(true);
                                            }}
                                            onAddHotel={() => {
                                                setActiveDayIndex(index);
                                                setShowHotelSelector(true);
                                            }}
                                            onRemoveItem={(itemId) => removeItemFromDay(index, itemId)}
                                            onReorder={(items) => reorderItemsInDay(index, items)}
                                        />
                                        {days.length > 1 && (
                                            <button
                                                onClick={() => removeDay(index)}
                                                className="absolute -right-6 top-8 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                title="Remove Day"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={addDay}
                                className="w-full py-12 border-2 border-dashed border-neutral-200 rounded-xl text-neutral-400 hover:text-black hover:border-black transition-all flex flex-col items-center gap-4 group"
                            >
                                <Plus className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Expand Chronology (Day {days.length + 1})</span>
                            </button>
                        </div>
                    </motion.div>
                ) : step === "SUCCESS" ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto text-center py-24 space-y-8"
                    >
                        <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                            <Sparkles className="w-12 h-12" />
                        </div>
                        <h3 className="text-4xl font-light uppercase tracking-tight">Narrative Initialized</h3>
                        <p className="text-gray-500 italic serif">
                            A travel consultant will review your bespoke architecture and reach out via your digital address within 24 hours to finalize the frequency.
                        </p>
                        <button
                            onClick={onBack}
                            className="bg-black text-white px-12 py-5 rounded-sm uppercase tracking-[0.2em] text-xs font-bold hover:bg-amber-600 transition-colors shadow-xl mt-8"
                        >
                            Return to Collections
                        </button>
                    </motion.div>
                ) : null
                }
            </AnimatePresence >

            {/* Destination Change Grid Modal */}
            <AnimatePresence>
                {
                    showDestinationChangeGrid && (
                        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-xl shadow-2xl flex flex-col"
                            >
                                <div className="p-8 border-b border-neutral-100 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-2xl font-light uppercase tracking-tight">Select Next Coordinate</h3>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Automatic travel time calculation will be applied</p>
                                    </div>
                                    <button onClick={() => setShowDestinationChangeGrid(false)} className="text-gray-400 hover:text-black">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {destinations.filter(d => d._id !== activeDestination?._id).map((dest) => (
                                        <button
                                            key={dest._id}
                                            onClick={() => addTravelBetweenDestinations(activeDayIndex ?? days.length - 1, dest)}
                                            className="group relative aspect-video overflow-hidden rounded-lg bg-neutral-100"
                                        >
                                            <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-[10px] font-bold uppercase tracking-widest border border-white/40 px-4 py-2">Select {dest.name}</span>
                                            </div>
                                            <div className="absolute bottom-4 left-4">
                                                <h4 className="text-white font-light uppercase tracking-tight text-lg">{dest.name}</h4>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >

            {/* Modals with enhanced filtering */}
            <AnimatePresence>
                {
                    showExperienceSelector && (
                        <ExperienceSelector
                            onClose={() => setShowExperienceSelector(false)}
                            onSelect={(exp) => activeDayIndex !== null && addExperienceToDay(activeDayIndex, exp)}
                            experiences={experiences.filter(e => {
                                const contextDest = activeDayIndex !== null ? getDestinationAtPoint(activeDayIndex) : activeDestination;
                                return !contextDest ||
                                    e.destinationSlug === contextDest.slug ||
                                    (e.destinations && e.destinations.includes(contextDest._id!));
                            })}
                        />
                    )
                }
                {
                    showHotelSelector && (
                        <HotelSelector
                            hotels={hotels.filter(h => {
                                const contextDest = activeDayIndex !== null ? getDestinationAtPoint(activeDayIndex) : activeDestination;
                                return !contextDest ||
                                    h.destination === contextDest._id ||
                                    h.destinationId === contextDest._id ||
                                    h.destinationSlug === contextDest.slug;
                            })}
                            onSelect={(hotel) => activeDayIndex !== null && addHotelToDay(activeDayIndex, hotel)}
                            onClose={() => setShowHotelSelector(false)}
                        />
                    )
                }
            </AnimatePresence >
        </motion.div >
    );
}

function FormInput({ label, name, value, onChange, placeholder, type = "text" }: any) {
    return (
        <div className="space-y-4 group">
            <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-500 group-focus-within:text-amber-600 transition-colors">
                {label}
            </label>
            <input
                type={type}
                name={name}
                required
                value={value}
                onChange={onChange}
                className="w-full border-b border-black/10 py-4 text-lg font-light text-black focus:outline-none focus:border-amber-600 transition-all bg-transparent rounded-none placeholder:text-gray-200"
                placeholder={placeholder}
            />
        </div>
    );
}
