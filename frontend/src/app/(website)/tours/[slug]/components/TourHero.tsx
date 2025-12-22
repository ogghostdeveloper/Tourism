"use client";

import { motion } from "framer-motion";
import { Clock, Tag } from "lucide-react";

interface TourHeroProps {
    title: string;
    image: string;
    category?: string;
    duration?: string;
    price?: string;
}

export function TourHero({ title, image, category, duration, price }: TourHeroProps) {
    return (
        <section className="h-screen relative overflow-hidden bg-white">
            {/* Background Image with Reveal */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Cinematic Overlays - Light Theme */}
                <div className="absolute inset-0 bg-linear-to-b from-white/40 via-transparent to-white/80" />
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/20 to-transparent" />
            </div>

            <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex items-center gap-6 mb-8"
                    >
                        <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.5em]">
              // expedition: {category || "Bhutan Discovery"}
                        </span>
                        <span className="h-px w-12 bg-black/10" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-7xl md:text-9xl font-light tracking-tighter leading-none mb-12 uppercase text-black"
                    >
                        The <span className="italic font-serif normal-case opacity-40">Journey</span> <br />
                        Through {title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-wrap items-center gap-12 border-t border-black/5 pt-12"
                    >
                        {duration && (
                            <div className="flex flex-col gap-2">
                                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Duration</span>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-amber-600" />
                                    <span className="text-xl font-light uppercase tracking-tight">{duration}</span>
                                </div>
                            </div>
                        )}

                        {price && (
                            <div className="flex flex-col gap-2">
                                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Pricing</span>
                                <div className="flex items-center gap-3">
                                    <Tag className="w-4 h-4 text-amber-600" />
                                    <span className="text-xl font-light uppercase tracking-tight">{price}</span>
                                </div>
                            </div>
                        )}

                        <div className="ml-auto hidden md:block">
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.5em] writing-mode-vertical-rl rotate-180">
                // authenticated expedition
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Light Leak Effect (Subtle) */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-amber-500/5 via-transparent to-transparent pointer-events-none mix-blend-soft-light" />
        </section>
    );
}
