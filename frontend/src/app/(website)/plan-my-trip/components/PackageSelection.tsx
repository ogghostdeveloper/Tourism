"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { Tour } from "../../tours/schema";

interface PackageSelectionProps {
    packages: Tour[];
    onBack: () => void;
}

export function PackageSelection({ packages, onBack }: PackageSelectionProps) {

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
                        // selection mode
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-none">
                        Curated <span className="italic font-serif normal-case text-amber-600">Journeys</span>
                    </h2>
                </div>
                <button
                    onClick={onBack}
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
                >
                    <span className="w-8 h-px bg-gray-200 group-hover:w-12 group-hover:bg-black transition-all" />
                    Change Mode
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {packages.map((pkg, index) => (
                    <motion.div
                        key={pkg._id || index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="group flex flex-col"
                    >
                        <div className="relative aspect-3/2 overflow-hidden mb-8">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-white font-mono text-[10px] uppercase tracking-widest">{pkg.duration} Discovery</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-3xl font-light tracking-tighter uppercase">{pkg.title}</h3>
                                <span className="text-amber-600 font-mono text-xs font-bold tracking-widest">{pkg.price}</span>
                            </div>

                            <p className="text-gray-500 font-light italic leading-relaxed text-lg">
                                "{pkg.description}"
                            </p>

                            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
                                {pkg.highlights?.slice(0, 3).map((highlight, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <Link
                                    href="/enquire"
                                    className="group inline-flex items-center gap-6 bg-black px-10 py-5 text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-amber-600 overflow-hidden relative"
                                >
                                    <span className="relative z-10">Bespoke Enquiry</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
                                    <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-500 transition-transform duration-500" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-32 text-center pt-24 border-t border-black/5">
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.5em] max-w-lg mx-auto leading-loose">
                    All packages include premium logistics, visa management, and private guides certified by the Kingdom of Bhutan.
                </p>
            </div>
        </motion.div>
    );
}
