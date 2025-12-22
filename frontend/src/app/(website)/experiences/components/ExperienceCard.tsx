"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Experience } from "@/app/admin/experiences/schema";
import { format } from "date-fns";

interface ExperienceCardProps {
    exp: Experience;
    index: number;
}

export function ExperienceCard({ exp, index }: ExperienceCardProps) {
    const cardRef = useRef(null);
    // Intersection observer to detect when the card is in the vertical center of the viewport
    const isInView = useInView(cardRef, {
        margin: "-15% 0px -15% 0px",
        amount: 0.3
    });

    const formatDateRange = (start?: string, end?: string) => {
        if (!start) return null;
        try {
            const startDate = new Date(start);
            if (!end) return format(startDate, "MMM dd, yyyy");
            const endDate = new Date(end);

            if (startDate.getFullYear() === endDate.getFullYear()) {
                if (startDate.getMonth() === endDate.getMonth()) {
                    return `${format(startDate, "MMM dd")} - ${format(endDate, "dd, yyyy")}`;
                }
                return `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd, yyyy")}`;
            }
            return `${format(startDate, "MMM dd, yyyy")} - ${format(endDate, "MMM dd, yyyy")}`;
        } catch (e) {
            return null;
        }
    };

    const dateRange = formatDateRange(exp.startDate, exp.endDate);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (index % 2) * 0.1 }}
        >
            <Link
                href={`/experiences/${exp.slug}`}
                className="group block relative"
            >
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-neutral-100 border border-black/5 mb-8">
                    <img
                        src={exp.image}
                        alt={exp.title}
                        className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 
                            ${isInView ? 'saturate-[1.2] scale-105' : 'saturate-[0.4] grayscale-[0.1]'}`}
                    />

                    {/* Foggy Overlay (Active when NOT in view) */}
                    <motion.div
                        animate={{
                            opacity: isInView ? 0 : 1,
                        }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-white/40 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"
                    />

                    {/* Foggy Gradient (Active when NOT in view) */}
                    <motion.div
                        animate={{
                            opacity: isInView ? 0 : 0.8,
                        }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"
                    />

                    {/* Clear Black Overlay (Active when IN view) */}
                    <motion.div
                        animate={{
                            opacity: isInView ? 0.3 : 0,
                        }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 bg-black z-15 pointer-events-none"
                    />

                    {/* Status Overlay */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-4 z-20">
                        <span className="h-px w-8 bg-amber-600/50" />
                        <span className="font-mono text-[9px] text-amber-600 uppercase tracking-widest font-bold">Discover Details</span>
                    </div>
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-bold transition-colors duration-700">
                                {exp.category} // {exp.duration || 'Discovery'}
                            </span>
                            {dateRange && (
                                <>
                                    <div className="w-1 h-1 rounded-full bg-amber-600/30" />
                                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-amber-600/80 uppercase tracking-widest font-bold">
                                        <Calendar className="w-3 h-3" />
                                        {dateRange}
                                    </div>
                                </>
                            )}
                        </div>
                        <h2 className={`text-4xl md:text-5xl font-light tracking-tighter group-hover:italic transition-all uppercase duration-700 ${isInView ? 'text-black' : 'text-gray-400'}`}>
                            {exp.title}
                        </h2>
                    </div>
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center group-hover:border-amber-500 transition-all duration-700 ${isInView ? 'border-amber-500/50 scale-110' : 'border-black/10'}`}>
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>

                <p className={`mt-6 font-light leading-relaxed max-w-md line-clamp-2 italic text-lg transition-all duration-700 ${isInView ? 'text-gray-900 translate-x-2' : 'text-gray-400 translate-x-0'}`}>
                    "{exp.description}"
                </p>

                {/* Vertical Decorative ID */}
                <div className={`absolute top-0 -right-4 font-mono text-[8px] tracking-widest rotate-90 origin-top-left py-2 border-l transition-colors duration-700 ${isInView ? 'text-amber-600 border-amber-600/20' : 'text-gray-300 border-black/5'}`}>
                    EXP-0{index + 1} // BHUTAN
                </div>
            </Link>
        </motion.div>
    );
}
