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
        <section className="py-24 bg-white text-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4"
                    >
                        Why Bhutan?
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-5xl font-light"
                    >
                        A Journey to the Soul
                    </motion.h3>
                </div>

                <div className="space-y-24">
                    {showcaseExperiences.map((experience, index) => (
                        <div
                            key={experience.slug}
                            className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } items-center gap-12 md:gap-24`}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-1/2"
                            >
                                <Link href={`/experiences/${experience.slug}`} className="block group">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={experience.image}
                                            alt={experience.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full md:w-1/2 space-y-6"
                            >
                                <h4 className="text-3xl font-light">{experience.title}</h4>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {experience.description}
                                </p>
                                <Link
                                    href={`/experiences/${experience.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:gap-4 transition-all"
                                >
                                    Explore {experience.category} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
