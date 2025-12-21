"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const destinations = [
    {
        name: "Thimphu",
        image: "https://loremflickr.com/800/1000/thimphu,bhutan?random=1",
        description: "The modern capital with ancient roots.",
    },
    {
        name: "Paro",
        image: "https://loremflickr.com/800/1000/paro,bhutan?random=2",
        description: "Home to the Tiger's Nest Monastery.",
    },
    {
        name: "Punakha",
        image: "https://loremflickr.com/800/1000/punakha,bhutan?random=3",
        description: "The old capital with the majestic Dzong.",
    },
    {
        name: "Bumthang",
        image: "https://loremflickr.com/800/1000/bumthang,bhutan?random=4",
        description: "The spiritual heartland of Bhutan.",
    },
];

export function Destinations() {
    return (
        <section className="py-24 bg-gray-50 text-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4"
                        >
                            Destinations
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-light"
                        >
                            Explore the Kingdom
                        </motion.h3>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link
                            href="/destinations"
                            className="text-sm font-medium uppercase tracking-wider border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                        >
                            View All Destinations
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <h4 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
                                {dest.name}
                            </h4>
                            <p className="text-sm text-gray-500">{dest.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
