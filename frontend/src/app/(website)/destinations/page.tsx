"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getDestinations } from "./actions";

interface Destination {
    slug: string;
    name: string;
    image: string;
    region: string;
    description: string;
}

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        getDestinations().then(setDestinations);
    }, []);

    return (
        <div className="min-h-screen bg-white text-black pt-32 pb-24 overflow-hidden">
            {/* Narrative Header */}
            <div className="container mx-auto px-6 mb-32 relative">
                <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none">
                    <span className="text-[25vw] font-bold uppercase leading-none tracking-tighter">
                        Regions
                    </span>
                </div>

                <div className="relative z-10 max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block"
                    >
            // explore regions
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-light tracking-tighter leading-tight mb-8"
                    >
                        Explore <span className="italic font-serif">Bhutan</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 text-lg font-light max-w-xl leading-relaxed"
                    >
                        Mapping the diverse landscapes of Bhutan. From the high alpine valleys of the north to the lush subtropical plains of the south.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index % 2 * 0.2 }}
                        >
                            <Link
                                href={`/destinations/${dest.slug}`}
                                className="group block relative"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-neutral-100 border border-black/5 mb-8">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Removed white overlay to show original colors */}
                                    <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                                    {/* Status Overlay */}
                                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                        <span className="h-px w-8 bg-amber-600/50" />
                                        <span className="font-mono text-[9px] text-amber-600 uppercase tracking-widest font-bold">Explore Now</span>
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2 block font-bold">
                                            Region: {dest.region}
                                        </span>
                                        <h2 className="text-4xl md:text-5xl font-light tracking-tighter group-hover:italic transition-all duration-500">
                                            {dest.name}
                                        </h2>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>

                                <p className="mt-6 text-gray-600 font-light leading-relaxed max-w-md line-clamp-2 italic text-lg">
                                    "{dest.description}"
                                </p>

                                {/* Vertical Decorative ID */}
                                <div className="absolute top-0 -right-4 font-mono text-[8px] tracking-widest text-gray-300 rotate-90 origin-top-left py-2 border-l border-black/5">
                                    DEST-0{index + 1} // BHUTAN
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
