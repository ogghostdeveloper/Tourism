"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Calendar, MapPin, Hotel, Sparkles, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PlanningMode = "package" | "custom" | null;

export default function PlanMyTripPage() {
    const [selectedMode, setSelectedMode] = useState<PlanningMode>(null);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
                    </div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm font-bold tracking-[0.2em] text-gray-300 uppercase block mb-6"
                    >
                        Your Journey Awaits
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-light tracking-tight text-white mb-6"
                    >
                        Plan Your Trip
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Choose from our curated packages or create your own bespoke journey through the Kingdom of Happiness
                    </motion.p>
                </div>
            </section>

            {/* Mode Selection */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    <AnimatePresence mode="wait">
                        {!selectedMode ? (
                            <motion.div
                                key="mode-selection"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {/* Package Option */}
                                <motion.button
                                    onClick={() => setSelectedMode("package")}
                                    className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-black transition-all duration-500 p-12 text-left"
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-4xl font-light tracking-tight text-black mb-4">
                                            Choose a Package
                                        </h2>
                                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                            Select from our expertly curated travel packages designed to showcase the best of Bhutan
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                                            Explore Packages <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.button>

                                {/* Custom Option */}
                                <motion.button
                                    onClick={() => setSelectedMode("custom")}
                                    className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-black transition-all duration-500 p-12 text-left"
                                    whileHover={{ y: -8 }}
                                >
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                            <Heart className="w-8 h-8" />
                                        </div>
                                        <h2 className="text-4xl font-light tracking-tight text-black mb-4">
                                            Create Your Own
                                        </h2>
                                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                            Build a bespoke itinerary tailored to your preferences, interests, and travel style
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                                            Start Building <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.button>
                            </motion.div>
                        ) : selectedMode === "package" ? (
                            <PackageSelection onBack={() => setSelectedMode(null)} />
                        ) : (
                            <CustomItineraryBuilder onBack={() => setSelectedMode(null)} />
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}

// Package Selection Component
function PackageSelection({ onBack }: { onBack: () => void }) {
    const packages = [
        {
            id: "1",
            name: "Cultural Immersion",
            duration: "7 Days",
            price: "From $4,500 pp",
            image: "https://loremflickr.com/800/600/bhutan,culture?random=30",
            description: "Dive deep into Bhutan's rich cultural heritage",
            highlights: ["Festival attendance", "Monastery visits", "Local workshops"]
        },
        {
            id: "2",
            name: "Adventure Seeker",
            duration: "10 Days",
            price: "From $6,800 pp",
            image: "https://loremflickr.com/800/600/trekking,mountains?random=31",
            description: "For thrill-seekers and outdoor enthusiasts",
            highlights: ["Himalayan treks", "White-water rafting", "Mountain biking"]
        },
        {
            id: "3",
            name: "Wellness & Rejuvenation",
            duration: "5 Days",
            price: "From $3,200 pp",
            image: "https://loremflickr.com/800/600/spa,wellness?random=32",
            description: "Restore balance to mind, body, and spirit",
            highlights: ["Hot stone baths", "Meditation", "Spa treatments"]
        },
        {
            id: "4",
            name: "Luxury Escape",
            duration: "12 Days",
            price: "From $15,000 pp",
            image: "https://loremflickr.com/800/600/luxury,resort?random=33",
            description: "Experience Bhutan in ultimate comfort",
            highlights: ["Five-star stays", "Helicopter tours", "Exclusive experiences"]
        },
        {
            id: "5",
            name: "Family Adventure",
            duration: "8 Days",
            price: "From $4,000 pp",
            image: "https://loremflickr.com/800/600/family,travel?random=34",
            description: "Create lasting memories with your family",
            highlights: ["Kid-friendly activities", "Educational workshops", "Easy hikes"]
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <button
                onClick={onBack}
                className="mb-12 text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors flex items-center gap-2"
            >
                ← Back to Options
            </button>

            <div className="mb-16 text-center">
                <h2 className="text-5xl font-light tracking-tight text-black mb-4">
                    Our Curated Packages
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Each package is thoughtfully designed to provide an unforgettable experience
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={pkg.image}
                                alt={pkg.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="text-white text-sm font-medium uppercase tracking-wider mb-2">
                                    {pkg.duration}
                                </div>
                                <h3 className="text-white text-2xl font-light tracking-tight">
                                    {pkg.name}
                                </h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {pkg.description}
                            </p>
                            <ul className="space-y-2 mb-6">
                                {pkg.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <Check className="w-4 h-4 text-black" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <span className="text-lg font-medium text-black">{pkg.price}</span>
                                <Link
                                    href="/enquire"
                                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:gap-4 transition-all"
                                >
                                    Book Now <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// Custom Itinerary Builder Component
function CustomItineraryBuilder({ onBack }: { onBack: () => void }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        duration: "",
        travelers: "",
        budget: "",
        experiences: [] as string[],
        destinations: [] as string[],
        hotels: [] as string[],
        specialRequests: ""
    });

    const experienceOptions = [
        { id: "wellness", name: "Wellness & Spa", icon: "🧘" },
        { id: "culture", name: "Culture & Festivals", icon: "🎭" },
        { id: "adventure", name: "Adventure & Trekking", icon: "⛰️" },
        { id: "nature", name: "Nature & Wildlife", icon: "🦅" },
        { id: "spiritual", name: "Spiritual Journey", icon: "🙏" },
        { id: "luxury", name: "Luxury Experiences", icon: "✨" }
    ];

    const destinationOptions = [
        { id: "paro", name: "Paro", description: "Tiger's Nest & Historic Valley" },
        { id: "thimphu", name: "Thimphu", description: "Capital City" },
        { id: "punakha", name: "Punakha", description: "Ancient Capital" },
        { id: "bumthang", name: "Bumthang", description: "Spiritual Heartland" },
        { id: "gangtey", name: "Gangtey", description: "Black-Necked Cranes" }
    ];

    const hotelCategories = [
        { id: "luxury", name: "Luxury Resorts", price: "$800-1,500/night" },
        { id: "boutique", name: "Boutique Hotels", price: "$400-800/night" },
        { id: "heritage", name: "Heritage Properties", price: "$300-600/night" },
        { id: "standard", name: "Comfortable Hotels", price: "$150-300/night" }
    ];

    const toggleSelection = (category: keyof typeof formData, value: string) => {
        const current = formData[category] as string[];
        if (current.includes(value)) {
            setFormData({
                ...formData,
                [category]: current.filter(item => item !== value)
            });
        } else {
            setFormData({
                ...formData,
                [category]: [...current, value]
            });
        }
    };

    const handleSubmit = () => {
        // In a real app, this would send data to the backend
        console.log("Custom itinerary request:", formData);
        window.location.href = "/enquire";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <button
                onClick={onBack}
                className="mb-12 text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors flex items-center gap-2"
            >
                ← Back to Options
            </button>

            <div className="mb-16 text-center">
                <h2 className="text-5xl font-light tracking-tight text-black mb-4">
                    Build Your Dream Journey
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Customize every aspect of your Bhutan adventure
                </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-16">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex items-center">
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                                step >= s
                                    ? "bg-black text-white"
                                    : "bg-gray-200 text-gray-400"
                            )}
                        >
                            {s}
                        </div>
                        {s < 5 && (
                            <div
                                className={cn(
                                    "w-16 h-0.5 transition-all",
                                    step > s ? "bg-black" : "bg-gray-200"
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h3 className="text-3xl font-light tracking-tight text-black mb-8">
                                Trip Basics
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Duration
                                    </label>
                                    <select
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full border-b-2 border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
                                    >
                                        <option value="">Select duration</option>
                                        <option value="3-5">3-5 Days</option>
                                        <option value="6-8">6-8 Days</option>
                                        <option value="9-12">9-12 Days</option>
                                        <option value="13+">13+ Days</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Number of Travelers
                                    </label>
                                    <select
                                        value={formData.travelers}
                                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                                        className="w-full border-b-2 border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
                                    >
                                        <option value="">Select travelers</option>
                                        <option value="1">Solo Traveler</option>
                                        <option value="2">2 Travelers</option>
                                        <option value="3-4">3-4 Travelers</option>
                                        <option value="5-8">5-8 Travelers</option>
                                        <option value="9+">9+ Travelers</option>
                                    </select>
                                </div>

                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                        Budget Range (per person)
                                    </label>
                                    <select
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full border-b-2 border-gray-200 py-3 text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
                                    >
                                        <option value="">Select budget</option>
                                        <option value="budget">Budget ($2,000-4,000)</option>
                                        <option value="moderate">Moderate ($4,000-8,000)</option>
                                        <option value="luxury">Luxury ($8,000-15,000)</option>
                                        <option value="ultra">Ultra Luxury ($15,000+)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end pt-8">
                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!formData.duration || !formData.travelers || !formData.budget}
                                    className={cn(
                                        "bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-4",
                                        (!formData.duration || !formData.travelers || !formData.budget) && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h3 className="text-3xl font-light tracking-tight text-black mb-8">
                                Select Your Experiences
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6">
                                {experienceOptions.map((exp) => (
                                    <button
                                        key={exp.id}
                                        onClick={() => toggleSelection("experiences", exp.id)}
                                        className={cn(
                                            "p-6 border-2 transition-all text-left hover:shadow-lg",
                                            formData.experiences.includes(exp.id)
                                                ? "border-black bg-black text-white"
                                                : "border-gray-200 hover:border-gray-400"
                                        )}
                                    >
                                        <div className="text-4xl mb-4">{exp.icon}</div>
                                        <div className="font-medium">{exp.name}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-8">
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={formData.experiences.length === 0}
                                    className={cn(
                                        "bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-4",
                                        formData.experiences.length === 0 && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h3 className="text-3xl font-light tracking-tight text-black mb-8">
                                Choose Your Destinations
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {destinationOptions.map((dest) => (
                                    <button
                                        key={dest.id}
                                        onClick={() => toggleSelection("destinations", dest.id)}
                                        className={cn(
                                            "p-8 border-2 transition-all text-left hover:shadow-lg",
                                            formData.destinations.includes(dest.id)
                                                ? "border-black bg-black text-white"
                                                : "border-gray-200 hover:border-gray-400"
                                        )}
                                    >
                                        <MapPin className="w-8 h-8 mb-4" />
                                        <div className="text-2xl font-light mb-2">{dest.name}</div>
                                        <div className={cn(
                                            "text-sm",
                                            formData.destinations.includes(dest.id) ? "text-gray-300" : "text-gray-600"
                                        )}>
                                            {dest.description}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-8">
                                <button
                                    onClick={() => setStep(2)}
                                    className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setStep(4)}
                                    disabled={formData.destinations.length === 0}
                                    className={cn(
                                        "bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-4",
                                        formData.destinations.length === 0 && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h3 className="text-3xl font-light tracking-tight text-black mb-8">
                                Select Accommodation Style
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {hotelCategories.map((hotel) => (
                                    <button
                                        key={hotel.id}
                                        onClick={() => toggleSelection("hotels", hotel.id)}
                                        className={cn(
                                            "p-8 border-2 transition-all text-left hover:shadow-lg",
                                            formData.hotels.includes(hotel.id)
                                                ? "border-black bg-black text-white"
                                                : "border-gray-200 hover:border-gray-400"
                                        )}
                                    >
                                        <Hotel className="w-8 h-8 mb-4" />
                                        <div className="text-2xl font-light mb-2">{hotel.name}</div>
                                        <div className={cn(
                                            "text-sm",
                                            formData.hotels.includes(hotel.id) ? "text-gray-300" : "text-gray-600"
                                        )}>
                                            {hotel.price}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between pt-8">
                                <button
                                    onClick={() => setStep(3)}
                                    className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={() => setStep(5)}
                                    disabled={formData.hotels.length === 0}
                                    className={cn(
                                        "bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-4",
                                        formData.hotels.length === 0 && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <h3 className="text-3xl font-light tracking-tight text-black mb-8">
                                Final Details
                            </h3>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                    Special Requests or Preferences
                                </label>
                                <textarea
                                    value={formData.specialRequests}
                                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                    rows={6}
                                    className="w-full border-2 border-gray-200 p-4 text-lg focus:outline-none focus:border-black transition-colors resize-none"
                                    placeholder="Tell us about any dietary requirements, accessibility needs, special occasions, or specific interests..."
                                />
                            </div>

                            {/* Summary */}
                            <div className="bg-gray-50 p-8 space-y-4">
                                <h4 className="text-xl font-medium mb-4">Your Trip Summary</h4>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Duration:</span>
                                        <span className="ml-2 font-medium">{formData.duration} days</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Travelers:</span>
                                        <span className="ml-2 font-medium">{formData.travelers}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Budget:</span>
                                        <span className="ml-2 font-medium">{formData.budget}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Experiences:</span>
                                        <span className="ml-2 font-medium">{formData.experiences.length} selected</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Destinations:</span>
                                        <span className="ml-2 font-medium">{formData.destinations.length} selected</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Accommodation:</span>
                                        <span className="ml-2 font-medium">{formData.hotels.length} style(s)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-8">
                                <button
                                    onClick={() => setStep(4)}
                                    className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors"
                                >
                                    ← Previous
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-black text-white px-12 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center gap-4"
                                >
                                    Submit Request <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
