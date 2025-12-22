"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { experiences } from "@/lib/data";

export function ExperienceTypes() {
    // Filter for the specific experience types we want to showcase
    const showcaseExperiences = experiences.filter(e =>
        ["wellness", "festivals", "nature"].includes(e.slug)
    );

    return (
        <section className="py-24 md:py-32 bg-white border-t border-black/5 relative overflow-hidden">
            {/* Background Decorative ID */}
            <div className="absolute top-0 right-12 font-mono text-[15vw] opacity-[0.03] select-none pointer-events-none font-bold uppercase tracking-tighter">
                Intel
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
                // curate your experience
                        </span>
                        <h2 className="text-5xl md:text-7xl font-light text-black tracking-tighter leading-tight uppercase">
                            Experience <span className="italic font-serif normal-case">Types</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="pb-4"
                    >
                        <Link
                            href="/experiences"
                            className="group inline-flex items-center gap-2 text-[10px] font-mono font-medium tracking-[0.3em] uppercase hover:text-amber-600 transition-all text-gray-400 border-b border-transparent hover:border-amber-600 pb-1"
                        >
                            All Field Briefings
                        </Link>
                    </motion.div>
                </div>

                <div className="space-y-20">
                    {showcaseExperiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div
                                className="w-full md:w-1/2"
                            >
                                <Link href={`/experiences/${experience.slug}`} className="block group relative bg-neutral-100 border border-black/10 hover:border-amber-600/50 transition-all duration-700 rounded-sm overflow-hidden">
                                    {/* Image Container with Reveal */}
                                    <div className="aspect-4/3 overflow-hidden relative">
                                        <img
                                            src={experience.image}
                                            alt={experience.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        {/* Removed opacity overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                            <span className="bg-white/80 backdrop-blur-md px-3 py-1 font-mono text-[9px] tracking-widest border border-black/10 text-black">
                                                TYPE-{index.toString().padStart(2, '0')}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-md border border-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                                <ArrowRight className="w-4 h-4 text-black" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="w-full md:w-1/2">
                                <span className="font-mono text-amber-600 text-[10px] uppercase tracking-[0.3em] mb-4 block">
                            // Priority Level: High
                                </span>
                                <h3 className="text-4xl md:text-5xl font-light mb-6 text-black tracking-tight leading-tight">
                                    {experience.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed mb-8 max-w-lg font-light">
                                    {experience.description}
                                </p>
                                <Link
                                    href={`/experiences/${experience.slug}`}
                                    className="group inline-flex items-center gap-4 text-gray-500 hover:text-black transition-colors"
                                >
                                    <span className="h-px w-12 bg-black/20 group-hover:w-20 group-hover:bg-amber-600 transition-all duration-500" />
                                    <span className="font-mono text-[10px] uppercase tracking-widest">Initialise Mission</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
