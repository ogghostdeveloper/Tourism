"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { PackageSelection } from "./components/PackageSelection";
import { CustomItineraryBuilder } from "./components/CustomItineraryBuilder";

type PlanningMode = "package" | "custom" | null;

export default function PlanMyTripPage() {
    const [selectedMode, setSelectedMode] = useState<PlanningMode>(null);

    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Immersive Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/cinematic/plan-hero.png"
                        className="w-full h-full object-cover scale-105"
                        alt="Bhutanese Aerial Landscape"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-white" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <span className="font-mono text-amber-600 text-xs font-bold tracking-[0.6em] uppercase block mb-8">
                            // kingdom of happiness
                        </span>
                        <h1 className="text-6xl md:text-9xl font-light tracking-tighter text-white mb-12 uppercase leading-none">
                            Architecture <br />
                            <span className="italic font-serif normal-case text-amber-600">of Bliss</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed italic font-serif">
                            Decide between our curated collections or craft a custom narrative tailored to your personal frequency.
                        </p>
                    </motion.div>
                </div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white">Begin Journey</span>
                    <div className="w-px h-12 bg-white/20 overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 48, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-1/2 bg-amber-600"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Mode Selection / Interface Area */}
            <section className="relative -mt-12 px-6">
                <div className="container mx-auto max-w-7xl">
                    <AnimatePresence mode="wait">
                        {!selectedMode ? (
                            <motion.div
                                key="mode-selection"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="grid md:grid-cols-2 gap-px bg-black/5 p-px shadow-2xl"
                            >
                                {/* Curated Package Card */}
                                <motion.button
                                    onClick={() => setSelectedMode("package")}
                                    className="group relative overflow-hidden bg-white hover:bg-neutral-50 transition-all duration-700 p-16 md:p-24 text-left flex flex-col justify-between aspect-4/5 md:aspect-auto"
                                >
                                    <div className="space-y-8 relative z-10">
                                        <div className="w-12 h-12 border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-6 leading-none">
                                                Curated <br />
                                                <span className="italic font-serif normal-case text-amber-600">Collections</span>
                                            </h2>
                                            <p className="text-gray-500 text-lg leading-relaxed font-light italic font-serif max-w-sm">
                                                Select from our masterfully designed archetypes for a seamless immersion into Bhutan's soul.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-black transition-all">
                                        Explore Archetypes <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
                                    </div>

                                    {/* Abstract Overlay */}
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                        <Sparkles className="w-64 h-64 rotate-12" />
                                    </div>
                                </motion.button>

                                {/* Custom Bespoke Card */}
                                <motion.button
                                    onClick={() => setSelectedMode("custom")}
                                    className="group relative overflow-hidden bg-white hover:bg-neutral-50 transition-all duration-700 p-16 md:p-24 text-left flex flex-col justify-between aspect-4/5 md:aspect-auto"
                                >
                                    <div className="space-y-8 relative z-10">
                                        <div className="w-12 h-12 border border-black/10 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-6 leading-none">
                                                Bespoke <br />
                                                <span className="italic font-serif normal-case text-amber-600">Architecture</span>
                                            </h2>
                                            <p className="text-gray-500 text-lg leading-relaxed font-light italic font-serif max-w-sm">
                                                Engage our interactive workshop to architect a unique journey that resonates with your specific narrative.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-amber-600 transition-all">
                                        Commence Workshop <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
                                    </div>

                                    {/* Abstract Overlay */}
                                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                        <Heart className="w-64 h-64 -rotate-12" />
                                    </div>
                                </motion.button>
                            </motion.div>
                        ) : selectedMode === "package" ? (
                            <div className="py-24">
                                <PackageSelection onBack={() => setSelectedMode(null)} />
                            </div>
                        ) : (
                            <div className="py-24">
                                <CustomItineraryBuilder onBack={() => setSelectedMode(null)} />
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
