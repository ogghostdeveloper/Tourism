"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, DollarSign } from "lucide-react";
import { Tour } from "@/app/(website)/tours/schema";

interface TourCardProps {
    tour: Tour;
    index: number;
}

export function TourCard({ tour, index }: TourCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link
                href={`/tours/${tour.slug}`}
                className="group relative block"
            >
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-neutral-100 border border-black/5 mb-8">
                    <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-all duration-1000 saturate-[1.2] brightness-[1.1] group-hover:saturate-[1.4] group-hover:scale-110"
                    />
                    {/* Vibrant Overlays - Removing desaturating overlays */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />

                    {tour.featured && (
                        <span className="absolute top-6 right-6 bg-amber-600 text-white px-3 py-1 font-mono text-[8px] uppercase tracking-[0.4em] z-20 shadow-lg">
                            Featured
                        </span>
                    )}

                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                        <span className="h-px w-10 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em] drop-shadow-md font-bold">
                            Visual Record // BHU-EXP
                        </span>
                    </div>
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-6 mb-4">
                            <span className="font-mono text-[11px] text-amber-600 uppercase tracking-[0.3em] font-bold">
                                {tour.category || "Expedition"}
                            </span>
                            <span className="w-1 h-1 bg-black/20 rounded-full" />
                            <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-gray-500 uppercase tracking-widest font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-amber-600/60" />
                                    {tour.duration}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-600/10 rounded-sm text-black border border-amber-600/20 shadow-xs">
                                    <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                                    {tour.price.replace("From ", "")}
                                </div>
                            </div>
                        </div>

                        <h3 className="text-5xl md:text-6xl font-light tracking-tighter text-black group-hover:italic transition-all duration-500 line-clamp-1 uppercase">
                            {tour.title}
                        </h3>
                    </div>

                    <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/5 transition-all duration-500 ml-6 shrink-0 shadow-xs">
                        <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                </div>

                <p className="mt-8 text-gray-600 font-light leading-relaxed max-w-xl line-clamp-2 italic text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                    "{tour.description}"
                </p>

                {/* Decorative ID - Vertical */}
                <div className="absolute top-0 -right-4 font-mono text-[9px] tracking-[0.6em] text-gray-300 rotate-90 origin-top-left py-4 border-l border-black/5 uppercase select-none pointer-events-none">
                    LOG // {tour.slug.split('-')[0].toUpperCase()}
                </div>
            </Link>
        </motion.div>
    );
}
