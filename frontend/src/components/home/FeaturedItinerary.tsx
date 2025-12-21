"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tour } from "@/app/(site)/tours/schema";

interface FeaturedItineraryProps {
    itinerary: Tour;
}

export function FeaturedItinerary({ itinerary }: FeaturedItineraryProps) {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-black text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-yellow-500 mb-4 block">
                        Featured Journey
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
                        {itinerary.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                        {itinerary.description}
                    </p>

                    <div className="flex flex-wrap gap-8 mb-10 text-sm font-medium uppercase tracking-wider text-gray-400">
                        <div>
                            <span className="block text-white mb-1">Duration</span>
                            {itinerary.duration}
                        </div>
                        <div>
                            <span className="block text-white mb-1">Price</span>
                            {itinerary.price}
                        </div>
                    </div>

                    <Link
                        href={`/tours/${itinerary.slug}`}
                        className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    >
                        View Full Tour
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
