"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Hotel } from "@/app/(website)/hotels/schema";

interface RelatedHotelsProps {
    hotels: Hotel[];
}

export function RelatedHotels({ hotels }: RelatedHotelsProps) {
    if (hotels.length === 0) return null;

    return (
        <section className="py-32 bg-neutral-50 border-t border-black/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <span className="font-mono text-amber-600 text-[13px] uppercase tracking-[0.4em] mb-4 block font-bold">
              // refined selection
                        </span>
                        <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase text-black">
                            Other <span className="italic font-serif normal-case opacity-40">Extraordinary</span> Stays
                        </h2>
                    </div>
                    <Link
                        href="/hotels"
                        className="font-mono text-[10px] tracking-[0.4em] uppercase text-black hover:text-amber-600 transition-colors border-b border-black pb-1 mb-2 font-bold"
                    >
                        View all accommodations
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {hotels.map((hotel, index) => (
                        <motion.div
                            key={hotel.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={`/hotels/${hotel.id}`} className="group block">
                                <div className="aspect-4/5 overflow-hidden mb-8 rounded-sm bg-neutral-200">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest font-bold">
                                        {hotel.priceRange} Luxury
                                    </span>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-1 h-3 ${i < hotel.rating ? "bg-amber-500" : "bg-black/10"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <h4 className="text-2xl font-light tracking-tight text-black group-hover:italic transition-all duration-500 uppercase">
                                    {hotel.name}
                                </h4>
                                <div className="mt-4 flex items-center gap-3 text-gray-400">
                                    <span className="h-px w-6 bg-black/10 transition-all duration-500 group-hover:w-12 group-hover:bg-amber-500" />
                                    <span className="font-mono text-[9px] uppercase tracking-widest">Explore Sanctuary</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
