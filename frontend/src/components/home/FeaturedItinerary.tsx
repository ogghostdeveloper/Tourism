"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tour } from "@/app/(website)/tours/schema";

interface FeaturedItineraryProps {
    itinerary: Tour;
}

export function FeaturedItinerary({ itinerary }: FeaturedItineraryProps) {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-white text-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.03] z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-24 md:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-6 block">
                        // featured itinerary
                    </span>
                    <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-black mb-8 leading-tight">
                        {itinerary.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12 font-light max-w-2xl">
                        {itinerary.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-t border-black/10 pt-8">
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Duration</span>
                            <span className="text-lg font-light text-black">{itinerary.duration}</span>
                        </div>
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Price</span>
                            <span className="text-lg font-light text-black">{itinerary.price}</span>
                        </div>
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Group Size</span>
                            <span className="text-lg font-light text-black">Small Group</span>
                        </div>
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 block mb-2">Activity</span>
                            <span className="text-lg font-light text-black">Moderate</span>
                        </div>
                    </div>

                    <Link
                        href={`/tours/${itinerary.slug}`}
                        className="group inline-flex items-center gap-4 bg-black text-white px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] hover:bg-amber-600 transition-colors"
                    >
                        View Full Itinerary
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
