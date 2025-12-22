"use client";

import { motion } from "framer-motion";

export function ToursHeader() {
    return (
        <div className="pt-48 pb-24 relative bg-white">
            {/* Large Background Decorative Text */}
            <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none transform translate-y-24">
                <span className="text-[25vw] font-bold uppercase leading-none tracking-tighter block text-black">
                    Journeys
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-amber-600 text-[13px] uppercase tracking-[0.4em] mb-4 block"
                    >
             // curated expeditions
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl md:text-[10rem] font-light tracking-tighter leading-none mb-10 uppercase text-black"
                    >
                        Our <span className="italic font-serif normal-case opacity-40 text-black">Expeditions</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-8"
                    >
                        <div className="w-px h-24 bg-black/10 mt-2" />
                        <p className="text-gray-600 text-xl font-light max-w-xl leading-relaxed italic">
                            "Carefully orchestrated journeys across the Kingdom. Each expedition is designed to immerse you deeply in the landscape, culture, and spirit of Bhutan."
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
