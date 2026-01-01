"use client";

import { ShieldCheck } from "lucide-react";
import { Tour } from "../../schema";

interface TourOverviewProps {
    tour: Tour;
}

export function TourOverview({ tour }: TourOverviewProps) {
    return (
        <div className="lg:col-span-8">
            <div className="flex flex-col gap-12">
                <div className="max-w-3xl">
                    <span className="font-mono text-amber-600 text-[13px] uppercase tracking-[0.4em] mb-4 block font-bold">
            // expedition overview
                    </span>
                    <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase text-black">
                        The <span className="italic font-serif normal-case text-amber-600">Narrative</span> <br />of {tour.title}
                    </h2>
                    <div className="relative pl-8 border-l border-black/10">
                        <p className="text-xl text-gray-500 leading-relaxed font-light italic">
                            "{tour.description}"
                        </p>
                        <div className="mt-8 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-3 font-bold">
                            <ShieldCheck className="w-4 h-4 text-amber-600" />
                            Verified Expedition Details // Kingdom of Bhutan
                        </div>
                    </div>
                </div>

                {tour.highlights && tour.highlights.length > 0 && (
                    <div className="p-12 border border-black/5 bg-neutral-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-[0.05]">
                            <div className="absolute top-0 right-0 w-full h-px bg-black" />
                            <div className="absolute top-0 right-0 w-px h-full bg-black" />
                        </div>

                        <h3 className="font-mono text-[13px] font-bold tracking-[0.3em] text-black uppercase mb-12">
                            Key Highlights
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {tour.highlights.map((highlight: string, index: number) => (
                                <li key={index} className="flex items-start gap-6 group/item">
                                    <span className="font-mono text-[11px] text-amber-600 mt-1 font-bold">[0{index + 1}]</span>
                                    <p className="text-gray-600 leading-relaxed font-light group-hover/item:text-black transition-colors duration-500 italic text-base">
                                        {highlight}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
