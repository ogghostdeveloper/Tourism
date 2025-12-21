"use client";

import { motion } from "framer-motion";
import { ItineraryDay } from "@/lib/data/itineraries";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ItineraryTimelineProps {
    days: ItineraryDay[];
    slug: string;
}

export function ItineraryTimeline({ days, slug }: ItineraryTimelineProps) {
    return (
        <div className="relative border-l border-gray-200 ml-4 md:ml-12 space-y-16 py-12">
            {days.map((day, index) => (
                <Link
                    key={day.day}
                    href={`/itineraries/${slug}/day/${day.day}`}
                    className="block"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative pl-8 md:pl-16 group cursor-pointer"
                    >
                        {/* Timeline Dot */}
                        <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-black ring-4 ring-white group-hover:scale-150 transition-transform duration-300" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 block">
                                        Day {day.day}
                                    </span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs uppercase tracking-widest text-black flex items-center gap-1">
                                        <Plus className="w-3 h-3" /> View Details
                                    </span>
                                </div>
                                <h3 className="text-2xl font-light mb-4 group-hover:text-gray-600 transition-colors">
                                    {day.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg line-clamp-3">
                                    {day.description}
                                </p>
                            </div>

                            {day.image && (
                                <div className="aspect-video overflow-hidden bg-gray-100">
                                    <img
                                        src={day.image}
                                        alt={day.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
