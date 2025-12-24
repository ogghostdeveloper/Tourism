"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Sparkles, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";

import { Destination } from "../../destinations/schema";
import { Experience } from "../../experiences/schema";

interface CustomItineraryBuilderProps {
    experiences: Experience[];
    destinations: Destination[];
    onBack: () => void;
}

export function CustomItineraryBuilder({ experiences, destinations, onBack }: CustomItineraryBuilderProps) {
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


    const hotelCategories = [
        { id: "ultra", name: "Ultra Luxury", price: "$1,500+ /night", detail: "Aman, Six Senses, Como" },
        { id: "luxury", name: "Luxury Resorts", price: "$800-1,500/night", detail: "Zhiwa Ling, Pemako" },
        { id: "boutique", name: "Boutique Stays", price: "$400-800/night", detail: "Heritage focused" },
        { id: "authentic", name: "Authentic Lodges", price: "$300-600/night", detail: "High-end farmstays" }
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

    const nextStep = () => setStep(s => Math.min(s + 1, 5));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
        >
            <div className="flex justify-between items-end mb-24 border-b border-black/5 pb-12">
                <div className="space-y-4">
                    <span className="font-mono text-amber-600 text-[10px] uppercase tracking-[0.5em] font-bold block">
                        // configuration workshop
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-none">
                        Bespoke <span className="italic font-serif normal-case text-amber-600">Architect</span>
                    </h2>
                </div>
                <button
                    onClick={onBack}
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
                >
                    <span className="w-8 h-px bg-gray-200 group-hover:w-12 group-hover:bg-black transition-all" />
                    Reset Design
                </button>
            </div>

            <div className="flex justify-between items-center max-w-2xl mx-auto mb-24">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-4 group">
                        <div className={cn(
                            "w-12 h-12 rounded-sm border flex items-center justify-center transition-all duration-500 font-mono text-xs font-bold",
                            step >= s ? "bg-black text-white border-black" : "border-black/20 text-black/40"
                        )}>
                            0{s}
                        </div>
                        <span className={cn(
                            "text-[8px] uppercase tracking-widest font-bold transition-opacity",
                            step === s ? "opacity-100" : "opacity-0"
                        )}>
                            {["Foundation", "Essence", "Terrain", "Sanctuary", "Finalize"][s - 1]}
                        </span>
                    </div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="space-y-16"
                        >
                            <h3 className="text-3xl font-light tracking-tighter uppercase text-center italic font-serif">Trip Foundation</h3>
                            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                                <div className="space-y-4 group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 group-focus-within:text-amber-600 transition-colors font-mono">
                                        // duration
                                    </label>
                                    <div className="relative border-b border-black/10 transition-all">
                                        <select
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="w-full bg-transparent py-4 text-lg font-light focus:outline-none appearance-none"
                                        >
                                            <option value="">Select duration</option>
                                            <option value="3-5">Boutique [3-5 Days]</option>
                                            <option value="6-8">Balanced [6-8 Days]</option>
                                            <option value="9-12">Immersive [9-12 Days]</option>
                                            <option value="13+">Odyssey [13+ Days]</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>
                                <div className="space-y-4 group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 group-focus-within:text-amber-600 transition-colors font-mono">
                                        // volume
                                    </label>
                                    <div className="relative border-b border-black/10 transition-all">
                                        <select
                                            value={formData.travelers}
                                            onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                                            className="w-full bg-transparent py-4 text-lg font-light focus:outline-none appearance-none"
                                        >
                                            <option value="">Select travelers</option>
                                            <option value="1">Solitary [1]</option>
                                            <option value="2">Duo [2]</option>
                                            <option value="3-4">Small Party [3-4]</option>
                                            <option value="5+">Large Party [5+]</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>
                                <div className="space-y-4 group md:col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 group-focus-within:text-amber-600 transition-colors font-mono">
                                        // investment range
                                    </label>
                                    <div className="relative border-b border-black/10 transition-all">
                                        <select
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full bg-transparent py-4 text-lg font-light focus:outline-none appearance-none"
                                        >
                                            <option value="">Select range per person</option>
                                            <option value="moderate">Refined [$4,000 - $8,000]</option>
                                            <option value="luxury">Luxury [$8,000 - $15,000]</option>
                                            <option value="ultra">Prestige [$15,000+]</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.duration || !formData.travelers || !formData.budget}
                                    className="group relative bg-black px-16 py-6 text-white text-[10px] font-bold uppercase tracking-[0.5em] disabled:opacity-30 disabled:hover:bg-black overflow-hidden transition-all hover:bg-amber-600"
                                >
                                    <span className="relative z-10 flex items-center gap-4">Define Essence <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" /></span>
                                    <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-500 transition-transform duration-500" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="space-y-12"
                        >
                            <h3 className="text-3xl font-light tracking-tighter uppercase text-center italic font-serif">Select Your Essence</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {experiences.map((exp) => (
                                    <button
                                        key={exp._id || exp.slug}
                                        onClick={() => toggleSelection("experiences", exp._id || exp.slug)}
                                        className={cn(
                                            "p-8 border transition-all duration-700 text-center flex flex-col items-center gap-4 hover:border-amber-600",
                                            formData.experiences.includes(exp._id || exp.slug)
                                                ? "bg-black border-black text-white"
                                                : "bg-white border-black/5 text-gray-400"
                                        )}
                                    >
                                        <div className="w-16 h-16 relative overflow-hidden rounded-full mb-2">
                                            <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[9px] font-bold uppercase tracking-widest">{exp.title}</span>
                                    </button>
                                ))}
                            </div>
                            <Navigation step={step} nextStep={nextStep} prevStep={prevStep} canNext={formData.experiences.length > 0} nextLabel="Select Terrain" />
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="space-y-12"
                        >
                            <h3 className="text-3xl font-light tracking-tighter uppercase text-center italic font-serif">Choose Your Terrain</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {destinations.map((dest) => (
                                    <button
                                        key={dest._id || dest.slug}
                                        onClick={() => toggleSelection("destinations", dest._id || dest.slug)}
                                        className={cn(
                                            "p-10 border transition-all duration-700 text-left relative overflow-hidden group hover:border-amber-600",
                                            formData.destinations.includes(dest._id || dest.slug)
                                                ? "bg-black border-black text-white shadow-xl"
                                                : "bg-white border-black/5 text-gray-500"
                                        )}
                                    >
                                        <MapPin className={cn("w-6 h-6 mb-4", formData.destinations.includes(dest._id || dest.slug) ? "text-amber-600" : "text-black/10")} />
                                        <h4 className="text-xl font-light tracking-tight mb-2 uppercase">{dest.name}</h4>
                                        <p className="text-[10px] font-light leading-relaxed tracking-widest uppercase opacity-60 italic">{dest.description}</p>
                                    </button>
                                ))}
                            </div>
                            <Navigation step={step} nextStep={nextStep} prevStep={prevStep} canNext={formData.destinations.length > 0} nextLabel="Define Sanctuary" />
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="space-y-12"
                        >
                            <h3 className="text-3xl font-light tracking-tighter uppercase text-center italic font-serif">Define Your Sanctuary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {hotelCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => toggleSelection("hotels", cat.id)}
                                        className={cn(
                                            "p-10 border transition-all duration-700 text-left group hover:border-amber-600",
                                            formData.hotels.includes(cat.id)
                                                ? "bg-black border-black text-white"
                                                : "bg-white border-black/5"
                                        )}
                                    >
                                        <Hotel className={cn("w-6 h-6 mb-4", formData.hotels.includes(cat.id) ? "text-amber-600" : "text-black/10")} />
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-xl font-light tracking-tight uppercase">{cat.name}</h4>
                                            <span className="text-[10px] font-mono tracking-widest text-amber-600 font-bold">{cat.price}</span>
                                        </div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">{cat.detail}</p>
                                    </button>
                                ))}
                            </div>
                            <Navigation step={step} nextStep={nextStep} prevStep={prevStep} canNext={formData.hotels.length > 0} nextLabel="Finalize Narrative" />
                        </motion.div>
                    )}

                    {step === 5 && (
                        <motion.div
                            key="step5"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-16"
                        >
                            <div className="space-y-8">
                                <h3 className="text-3xl font-light tracking-tighter uppercase italic font-serif">Finalize Narrative</h3>
                                <div className="space-y-4 group">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-500 group-focus-within:text-amber-600 transition-colors font-mono italic">
                                        // nuances & special intentions
                                    </label>
                                    <textarea
                                        value={formData.specialRequests}
                                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                        rows={6}
                                        className="w-full border-b border-black/10 py-6 text-xl font-light focus:outline-none focus:border-amber-600 transition-all bg-transparent rounded-none resize-none placeholder:text-gray-200 italic font-serif"
                                        placeholder="Speak of your intentions, dietary requirements, or special milestones..."
                                    />
                                </div>
                            </div>

                            <div className="bg-neutral-50 p-12 space-y-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-px bg-amber-600/20" />
                                <div className="absolute top-0 right-0 w-px h-32 bg-amber-600/20" />

                                <span className="font-mono text-[9px] text-amber-600 uppercase tracking-[0.6em] font-bold flex items-center gap-4">
                                    <Sparkles className="w-3 h-3" /> Synthesis Summary
                                </span>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                                    <div>
                                        <span className="block mb-2 text-black/20">// Duration</span>
                                        <span className="text-black font-bold">{formData.duration || "N/A"} Days</span>
                                    </div>
                                    <div>
                                        <span className="block mb-2 text-black/20">// Volume</span>
                                        <span className="text-black font-bold">{formData.travelers || "N/A"} Travelers</span>
                                    </div>
                                    <div>
                                        <span className="block mb-2 text-black/20">// Investment</span>
                                        <span className="text-black font-bold">{formData.budget?.toUpperCase() || "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="block mb-2 text-black/20">// Terrain</span>
                                        <span className="text-black font-bold">{formData.destinations.length} Clusters</span>
                                    </div>
                                    <div>
                                        <span className="block mb-2 text-black/20">// Essence</span>
                                        <span className="text-black font-bold">{formData.experiences.length} Themes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-8">
                                <button onClick={prevStep} className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">← Sculpt Previous</button>
                                <button
                                    onClick={() => window.location.href = "/enquire"}
                                    className="group relative bg-amber-600 px-20 py-8 text-white text-[11px] font-bold uppercase tracking-[0.6em] overflow-hidden transition-all shadow-2xl hover:bg-black"
                                >
                                    <span className="relative z-10 flex items-center gap-6">Commence Synthesis <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" /></span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-black transition-transform duration-700 ease-in-out" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function Navigation({ step, nextStep, prevStep, canNext, nextLabel }: any) {
    return (
        <div className="flex justify-between items-center pt-12 border-t border-black/5">
            <button
                onClick={prevStep}
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
            >
                ← Refine Previous
            </button>
            <button
                onClick={nextStep}
                disabled={!canNext}
                className="group relative bg-black px-16 py-6 text-white text-[10px] font-bold uppercase tracking-[0.4em] disabled:opacity-20 overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-4">{nextLabel} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" /></span>
                <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-600 transition-transform duration-500" />
            </button>
        </div>
    );
}
