"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Calendar, Loader2, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Destination } from "../../destinations/schema";
import { Experience } from "../../experiences/schema";
import { DayItinerary, ItineraryItem } from "@/app/admin/tour-requests/types";
import { DayBuilder } from "./builder/DayBuilder";
import { ExperienceSelector } from "./builder/ExperienceSelector";
import { TravelSelector } from "./builder/TravelSelector";
import { submitTourRequest } from "../actions";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function generateId() {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

interface CustomItineraryBuilderProps {
    experiences: Experience[];
    destinations: Destination[];
    onBack: () => void;
}

type BuilderStep = "BUILDER" | "DETAILS" | "SUCCESS";

export function CustomItineraryBuilder({ experiences, destinations, onBack }: CustomItineraryBuilderProps) {
    const [step, setStep] = useState<BuilderStep>("BUILDER");

    // Builder State
    const [days, setDays] = useState<DayItinerary[]>([
        { day: 1, items: [] } // Start with Day 1
    ]);
    const [activeDayIndex, setActiveDayIndex] = useState<number | null>(null);
    const [showExperienceSelector, setShowExperienceSelector] = useState(false);
    const [showTravelSelector, setShowTravelSelector] = useState(false);

    // Form State
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        travelers: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                duration: experience.duration || "2 Hours", // Default if missing
                image: experience.image
            }
        };
        newDays[dayIndex].items.push(newItem);
        setDays(newDays);
        setShowExperienceSelector(false);
    };

    const addTravelToDay = (dayIndex: number, data: { from: string; to: string; duration: number }) => {
        const newDays = [...days];
        const newItem: ItineraryItem = {
            id: generateId(),
            type: "travel",
            order: newDays[dayIndex].items.length,
            travel: {
                from: data.from,
                to: data.to,
                duration: data.duration
            }
        };
        newDays[dayIndex].items.push(newItem);
        setDays(newDays);
        setShowTravelSelector(false);
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
                    {step === "DETAILS" && (
                        <button onClick={() => setStep("BUILDER")} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                            Back to Builder
                        </button>
                    )}
                    <button onClick={onBack} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors">
                        Exit Studio
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === "BUILDER" ? (
                    <motion.div
                        key="builder"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-12"
                    >
                        {/* Days List */}
                        <div className="space-y-8">
                            {days.map((day, index) => (
                                <div key={day.day} className="relative group">
                                    <DayBuilder
                                        day={day}
                                        totalHours={calculateDayHours(day.items)}
                                        isValid={calculateDayHours(day.items) <= 18}
                                        onAddExperience={() => {
                                            setActiveDayIndex(index);
                                            setShowExperienceSelector(true);
                                        }}
                                        onAddTravel={() => {
                                            setActiveDayIndex(index);
                                            setShowTravelSelector(true);
                                        }}
                                        onRemoveItem={(itemId) => removeItemFromDay(index, itemId)}
                                        onReorder={(items) => reorderItemsInDay(index, items)}
                                    />
                                    {days.length > 1 && (
                                        <button
                                            onClick={() => removeDay(index)}
                                            className="absolute -right-12 top-8 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            title="Remove Day"
                                        >
                                            <span className="sr-only">Remove Day</span>
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-100">
                            <button
                                onClick={addDay}
                                className="flex items-center gap-3 px-8 py-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-black hover:border-black transition-colors uppercase tracking-widest text-xs font-bold"
                            >
                                <Plus className="w-4 h-4" /> Add Day {days.length + 1}
                            </button>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Duration</span>
                                    <span className="text-2xl font-light">{days.length} Days</span>
                                </div>
                                <button
                                    onClick={() => {
                                        const validation = validateItinerary();
                                        if (validation.valid) {
                                            setStep("DETAILS");
                                        } else {
                                            toast.error(validation.message);
                                        }
                                    }}
                                    className="bg-black text-white px-12 py-5 rounded-sm uppercase tracking-[0.2em] text-xs font-bold hover:bg-amber-600 transition-colors shadow-xl"
                                >
                                    Proceed to Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="max-w-3xl mx-auto space-y-12"
                    >
                        <div className="bg-gray-50 p-8 rounded border border-gray-200">
                            <h3 className="text-xl font-light uppercase tracking-tight mb-6 text-black">Itinerary Summary</h3>
                            <div className="space-y-4">
                                {days.map(day => (
                                    <div key={day.day} className="flex gap-4 text-sm">
                                        <span className="font-bold w-16 text-black">Day {day.day}</span>
                                        <span className="text-black">{day.items.length} Activities ({calculateDayHours(day.items)} Hrs)</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-16">
                            {/* Personal Name Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
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
                            </div>

                            {/* Contact Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
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

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                <div className="space-y-4 group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black group-focus-within:text-amber-600 transition-colors">
                                        Traveler Count
                                    </label>
                                    <Select
                                        value={userDetails.travelers}
                                        onValueChange={(value) => setUserDetails({ ...userDetails, travelers: value })}
                                    >
                                        <SelectTrigger className="w-full border-b border-black/10 py-4 text-lg font-light focus:outline-none focus:border-amber-600 transition-all bg-transparent rounded-none placeholder:text-gray-300 h-auto px-0">
                                            <SelectValue placeholder="Select volume" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Solitary [1]</SelectItem>
                                            <SelectItem value="2">Duo [2]</SelectItem>
                                            <SelectItem value="3-4">Small Group [3-4]</SelectItem>
                                            <SelectItem value="5-8">Large Group [5-8]</SelectItem>
                                            <SelectItem value="9+">Kingdom Delegation [9+]</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Large Message Area */}
                            <div className="space-y-4 group">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black group-focus-within:text-amber-600 transition-colors font-mono">
                                    // Narrative & Requirements
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

                            <div className="pt-12">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "group relative w-full overflow-hidden bg-black py-8 text-white text-[10px] font-bold uppercase tracking-[0.5em] transition-all hover:bg-amber-600",
                                        isSubmitting && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-6">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" /> Initiating Transmission...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" /> Submit Custom Itinerary
                                            </>
                                        )}
                                        {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" />}
                                    </span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-amber-500 transition-transform duration-700 ease-in-out" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <AnimatePresence>
                {showExperienceSelector && (
                    <ExperienceSelector
                        experiences={experiences}
                        onSelect={(exp) => activeDayIndex !== null && addExperienceToDay(activeDayIndex, exp)}
                        onClose={() => setShowExperienceSelector(false)}
                    />
                )}
                {showTravelSelector && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowTravelSelector(false)}
                    >
                        <div className="w-full max-w-2xl" onClick={e => e.stopPropagation()}>
                            <TravelSelector
                                destinations={destinations}
                                onConfirm={(data) => activeDayIndex !== null && addTravelToDay(activeDayIndex, data)}
                                onCancel={() => setShowTravelSelector(false)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
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
