"use client";

import React from "react";
import Link from "next/link";
import { Experience } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface SimilarExperiencesProps {
    currentSlug: string;
    experiences: Experience[];
}

export default function SimilarExperiences({ currentSlug, experiences }: SimilarExperiencesProps) {
    const similar = experiences
        .filter((e) => e.slug !== currentSlug)
        .slice(0, 3);

    if (similar.length === 0) return null;

    return (
        <section className="py-20 bg-neutral-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-light mb-12 text-white">You May Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similar.map((experience) => (
                        <Link
                            key={experience.slug}
                            href={`/experiences/${experience.slug}`}
                            className="group block"
                        >
                            <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                                <img
                                    src={experience.image}
                                    alt={experience.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block">
                                {experience.category}
                            </span>
                            <h3 className="text-xl text-white group-hover:text-gray-300 transition-colors mb-4">
                                {experience.title}
                            </h3>
                            <span className="inline-flex items-center gap-2 text-sm text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
                                Explore <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
