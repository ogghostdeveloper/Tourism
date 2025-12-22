"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const destinations = [
    {
        name: "Thimphu",
        title: "Thimphu",
        region: "Western Bhutan",
        image: "https://images.unsplash.com/photo-1626014902273-03e5c7921318?q=80&w=2600&auto=format&fit=crop",
        description: "The capital and largest city of Bhutan, Thimphu is a unique blend of tradition and modernity. Explore the vibrant markets, ancient monasteries, and the bustling city life nestled in the heart of the Himalayas.",
        slug: "thimphu",
    },
    {
        name: "Paro",
        title: "Paro",
        region: "Western Bhutan",
        image: "https://images.unsplash.com/photo-1549646875-9e663a0333db?q=80&w=2600&auto=format&fit=crop",
        description: "Home to the iconic Tiger's Nest Monastery (Taktsang), Paro is a beautiful valley with pristine air, clear rivers, and sacred sites. It is also the site of the country's only international airport.",
        slug: "paro",
    },
    {
        name: "Punakha",
        title: "Punakha",
        region: "Central Bhutan",
        image: "https://images.unsplash.com/photo-1572455986927-9c9886756623?q=80&w=2600&auto=format&fit=crop",
        description: "The old capital of Bhutan, Punakha is known for the majestic Punakha Dzong, located at the confluence of the Pho Chhu and Mo Chhu rivers. It offers a warmer climate and stunning scenic beauty.",
        slug: "punakha",
    },
    {
        name: "Bumthang",
        title: "Bumthang",
        region: "Central Bhutan",
        image: "https://images.unsplash.com/photo-1605634509428-2c673177f139?q=80&w=2600&auto=format&fit=crop",
        description: "Often referred to as the spiritual heartland of Bhutan, Bumthang is home to some of the country's oldest temples and monasteries. The fertile valleys are famous for their buckwheat, dairy, and textiles.",
        slug: "bumthang",
    },
];

export function Destinations() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % destinations.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    };

    const currentDestination = destinations[currentIndex];
    // Calculate next destination index for preview content (wrapping around)
    const nextIndex = (currentIndex + 1) % destinations.length;
    const nextDestination = destinations[nextIndex];

    return (
        <section className="py-24 md:py-32 bg-white border-t border-black/5 relative overflow-hidden">
            {/* Background Decorative ID */}
            <div className="absolute top-0 right-12 font-mono text-[15vw] opacity-[0.03] select-none pointer-events-none font-bold uppercase tracking-tighter">
                Regions
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
              // explore by region
                        </span>
                        <h2 className="text-5xl md:text-7xl font-light text-black tracking-tighter leading-tight uppercase">
                            Featured <span className="italic font-serif normal-case">Destinations</span>
                        </h2>
                    </motion.div>

                    {/* Navigation Controls */}
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                            aria-label="Previous destination"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                            aria-label="Next destination"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Main Card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className="group"
                        >
                            <Link href={`/destinations/${currentDestination.slug}`} className="block">
                                <div className="relative aspect-video lg:aspect-4/3 overflow-hidden rounded-sm mb-8">
                                    <img
                                        src={currentDestination.image}
                                        alt={currentDestination.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-8 left-8">
                                        <div className="flex items-center gap-3">
                                            <span className="h-[1px] w-8 bg-amber-600"></span>
                                            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600">Explore Now</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-8 right-8 writing-vertical-rl text-[10px] font-mono tracking-widest text-white/50 uppercase rotate-180">
                                        DEST-{currentIndex.toString().padStart(2, '0')} — {currentDestination.name}
                                    </div>
                                </div>

                                <div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2 block">
                                        Region: {currentDestination.region}
                                    </span>
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-5xl md:text-6xl font-light tracking-tighter italic text-black mb-4">
                                            {currentDestination.title}
                                        </h3>
                                        <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white transition-all duration-300 mb-6">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <p className="text-gray-500 font-light leading-relaxed max-w-xl">
                                        "{currentDestination.description}"
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    </AnimatePresence>

                    {/* Next Preview Card (Static / Animated on Switch) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={nextIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="hidden lg:block group opacity-60 hover:opacity-100 transition-opacity duration-500 cursor-pointer"
                            onClick={nextSlide}
                        >
                            <div className="relative aspect-video lg:aspect-4/3 overflow-hidden rounded-sm mb-8">
                                <img
                                    src={nextDestination.image}
                                    alt={nextDestination.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-8 left-8">
                                    <div className="flex items-center gap-3">
                                        <span className="h-[1px] w-8 bg-amber-600"></span>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600">Next Region</span>
                                    </div>
                                </div>
                                <div className="absolute top-8 right-8 writing-vertical-rl text-[10px] font-mono tracking-widest text-white/50 uppercase rotate-180">
                                    DEST-{nextIndex.toString().padStart(2, '0')}
                                </div>
                            </div>

                            <div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-2 block">
                                    Region: {nextDestination.region}
                                </span>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-5xl font-light tracking-tighter text-black mb-4">
                                        {nextDestination.title}
                                    </h3>
                                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-4 opacity-0 group-hover:opacity-100">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-gray-500 font-light leading-relaxed max-w-xl line-clamp-2">
                                    "{nextDestination.description}"
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

        </section>
    );
}
