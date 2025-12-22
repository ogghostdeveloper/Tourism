"use client";

import { motion } from "framer-motion";
import { Clock, Mountain, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ExperienceHeroProps {
    title: string;
    image: string;
    category: string;
    duration?: string;
    difficulty?: string;
    startDate?: string;
    endDate?: string;
}

export function ExperienceHero({
    title,
    image,
    category,
    duration,
    difficulty,
    startDate,
    endDate
}: ExperienceHeroProps) {
    const formatDateRange = (start?: string, end?: string) => {
        if (!start) return null;
        try {
            const sDate = new Date(start);
            if (!end) return format(sDate, "MMMM dd, yyyy");
            const eDate = new Date(end);

            if (sDate.getFullYear() === eDate.getFullYear()) {
                if (sDate.getMonth() === eDate.getMonth()) {
                    return `${format(sDate, "MMMM dd")} - ${format(eDate, "dd, yyyy")}`;
                }
                return `${format(sDate, "MMMM dd")} - ${format(eDate, "MMMM dd, yyyy")}`;
            }
            return `${format(sDate, "MMMM dd, yyyy")} - ${format(eDate, "MMMM dd, yyyy")}`;
        } catch (e) {
            return null;
        }
    };

    const dateRange = formatDateRange(startDate, endDate);
    return (
        <div className="h-[90vh] relative overflow-hidden bg-white">
            {/* Background Image with Color Reveal */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
            >
                <img src={image} alt={title} className="w-full h-full object-cover saturate-[1.1] contrast-[1.1]" />
                {/* Cinematic Overlays - Only fade to white at the very bottom edge */}
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-white via-90%" />
                <div className="absolute inset-0 bg-linear-to-tr from-amber-500/5 via-transparent to-blue-500/5 mix-blend-overlay" />
            </motion.div>

            {/* Animated Light Leak */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-amber-500/20 blur-[120px] rounded-full mix-blend-screen"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
                {/* Background Large Text (Color Accent) */}
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.07, x: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute font-bold text-[20vw] uppercase leading-none tracking-tighter select-none pointer-events-none text-amber-500 whitespace-nowrap"
                >
                    {category}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="relative z-10"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-amber-400 text-xs uppercase tracking-[0.6em] mb-8 block drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    >
            // exploring: {category}
                    </motion.span>
                    <h1 className="text-7xl md:text-[10rem] font-light tracking-tighter leading-none mb-12 uppercase drop-shadow-2xl">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 !== 0 ? "italic font-serif normal-case text-amber-100" : "text-white"}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-12 mt-12 bg-black/20 backdrop-blur-md border border-white/5 p-8 rounded-sm">
                        {duration && (
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                </div>
                                <div className="text-left">
                                    <span className="block font-mono text-[8px] text-gray-500 uppercase tracking-widest">Duration</span>
                                    <span className="font-light tracking-widest text-sm uppercase">{duration}</span>
                                </div>
                            </div>
                        )}

                        {(category === "Culture" || category === "Festival" || dateRange) && dateRange && (
                            <>
                                <div className="h-12 w-px bg-white/10 hidden md:block" />
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                                        <Calendar className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <div className="text-left">
                                        <span className="block font-mono text-[8px] text-gray-500 uppercase tracking-widest">Event Dates</span>
                                        <span className="font-light tracking-widest text-sm uppercase text-amber-100">{dateRange}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="h-12 w-px bg-white/10 hidden md:block" />

                        {difficulty && (
                            <div className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                                    <Mountain className="w-4 h-4 text-amber-500" />
                                </div>
                                <div className="text-left">
                                    <span className="block font-mono text-[8px] text-gray-500 uppercase tracking-widest">Intensity</span>
                                    <span className="font-light tracking-widest text-sm uppercase">{difficulty}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-12 flex flex-col items-start gap-4"
            >
                <div className="font-mono text-[9px] tracking-[0.3em] text-amber-700/60 uppercase space-y-2">
                    <p className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-amber-600 rounded-full animate-pulse" />
                        Kingdom of Bhutan
                    </p>
                    <p className="flex items-center gap-2 text-gray-500">
                        Verified Experiences
                    </p>
                </div>
                <div className="w-px h-16 bg-linear-to-b from-amber-600/50 to-transparent" />
            </motion.div>
        </div>
    );
}
