"use client";

import { motion } from "framer-motion";

export function ExperiencesHeader() {
    return (
        <div className="pt-48 pb-12 relative">
            {/* Large Background Decorative Text */}
            <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none transform translate-y-24">
                <span className="text-[25vw] font-bold uppercase leading-none tracking-tighter block">
                    Discover
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block"
                    >
             // curated collection
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-7xl md:text-[10rem] font-light tracking-tighter leading-none mb-10 uppercase"
                    >
                        Our <span className="italic font-serif normal-case opacity-60 text-black">Experiences</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 text-lg font-light max-w-xl leading-relaxed italic border-l border-black/10 pl-8"
                    >
                        "Explore a collection of unique journeys across Bhutan.
                        Select a category below to find your next adventure."
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
