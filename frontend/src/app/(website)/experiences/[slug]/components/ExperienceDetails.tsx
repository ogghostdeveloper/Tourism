"use client";

import React from "react";
import { ExperienceOverview } from "./ExperienceOverview";

interface ExperienceDetailsProps {
    experience: {
        title: string;
        description: string;
        slug: string;
        highlights?: string[];
    };
}

export function ExperienceDetails({ experience }: ExperienceDetailsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            {/* Essence / Overview Section */}
            <div className="lg:col-span-8">
                <ExperienceOverview
                    title={experience.title}
                    description={experience.description}
                    highlights={experience.highlights}
                />
            </div>

            {/* Sidebar / Booking Card */}
            <div className="lg:col-span-4 sticky top-32">
                <div className="relative p-10 border border-black/5 bg-white shadow-xs overflow-hidden group">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-amber-600/20 group-hover:border-amber-600/50 transition-colors" />

                    <span className="font-mono text-[8px] text-amber-600 uppercase tracking-[0.5em] mb-8 block font-bold">
            // reserve discovery
                    </span>

                    <h3 className="text-3xl font-light tracking-tighter text-black mb-8 uppercase italic serif">
                        Plan Your <span className="font-serif">Adventure</span>
                    </h3>

                    <p className="text-gray-600 font-light leading-relaxed mb-12 italic text-sm">
                        "Our travel specialists will weave this experience into your personal Bhutanese story. Secure your place in the Kingdom."
                    </p>

                    <div className="space-y-6">
                        <a
                            href="/enquire"
                            className="group relative flex items-center justify-center gap-6 bg-black py-6 text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-amber-600 overflow-hidden"
                        >
                            <span className="relative z-10">Start Planning</span>
                            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-500 transition-transform duration-500" />
                        </a>

                        <div className="flex items-center justify-center gap-4 py-4 border-y border-black/5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest font-bold">Guide availability confirmed</span>
                        </div>
                    </div>

                    {/* Additional Meta */}
                    <div className="mt-12 pt-8 border-t border-black/5 text-gray-400 font-mono text-[9px] uppercase tracking-[0.3em] leading-loose flex justify-between items-end font-bold">
                        <div>
                            Ref: {experience.slug.toUpperCase()} <br />
                            Auth: Kingdom Access
                        </div>
                        <div className="text-right">
                            Status: <br /> Ready
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
