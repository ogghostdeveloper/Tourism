"use client";

import { motion } from "framer-motion";
import { Tour } from "../../tours/schema";
import { TourCard } from "@/components/common/TourCard";

interface PackageSelectionProps {
    packages: Tour[];
    onBack: () => void;
    onSelect: (tour: Tour) => void;
}

export function PackageSelection({ packages, onBack, onSelect }: PackageSelectionProps) {

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
                    <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase leading-none text-black">
                        Curated <span className="italic font-serif normal-case text-amber-600">Journeys</span>
                    </h2>
                </div>
                <button
                    onClick={onBack}
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-amber-500 transition-colors"
                >
                    <span className="w-8 h-px bg-gray-200 group-hover:w-12 group-hover:bg-amber-500 transition-all" />
                    Change Mode
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {packages.map((pkg, index) => (
                    <TourCard
                        key={pkg._id || index}
                        tour={pkg}
                        index={index}
                        onClick={() => onSelect(pkg)}
                    />
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
