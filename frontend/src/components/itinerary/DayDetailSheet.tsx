"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BedDouble, MapPin, Camera } from "lucide-react";
import { ItineraryDay } from "@/lib/data/itineraries";

interface DayDetailSheetProps {
    day: ItineraryDay | null;
    onClose: () => void;
}

export function DayDetailSheet({ day, onClose }: DayDetailSheetProps) {
    return (
        <AnimatePresence>
            {day && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-white z-50 shadow-2xl overflow-y-auto"
                    >
                        <div className="relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Hero Image */}
                            {day.image && (
                                <div className="h-64 relative">
                                    <img
                                        src={day.image}
                                        alt={day.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <span className="text-sm font-bold tracking-[0.2em] uppercase opacity-80 mb-2 block">
                                            Day {day.day}
                                        </span>
                                        <h2 className="text-3xl font-light">{day.title}</h2>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-8 space-y-10">
                                <div>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {day.description}
                                    </p>
                                </div>

                                {/* Stay */}
                                {day.accommodation && (
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                            <BedDouble className="w-4 h-4" /> Stay
                                        </h3>
                                        <p className="text-xl font-light">{day.accommodation}</p>
                                    </div>
                                )}

                                {/* Do */}
                                {day.activities && day.activities.length > 0 && (
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                            <MapPin className="w-4 h-4" /> Do
                                        </h3>
                                        <ul className="space-y-3">
                                            {day.activities.map((activity, index) => (
                                                <li key={index} className="flex items-center gap-3 text-gray-700">
                                                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* See */}
                                {day.highlights && day.highlights.length > 0 && (
                                    <div>
                                        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                            <Camera className="w-4 h-4" /> See
                                        </h3>
                                        <ul className="space-y-3">
                                            {day.highlights.map((highlight, index) => (
                                                <li key={index} className="flex items-center gap-3 text-gray-700">
                                                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
