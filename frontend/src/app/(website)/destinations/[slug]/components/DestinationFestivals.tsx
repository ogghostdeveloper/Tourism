"use client";

import { Experience } from "../../schema";
import { FestivalCard } from "@/components/common/FestivalCard";

interface DestinationFestivalsProps {
  festivals: Experience[];
}

export function DestinationFestivals({ festivals }: DestinationFestivalsProps) {
  if (festivals.length === 0) return null;

  return (
    <section className="py-40 bg-white text-black relative overflow-hidden border-t border-black/5">
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 left-12 font-mono text-[10vw] opacity-[0.02] select-none pointer-events-none font-bold uppercase tracking-tighter">
        Culture
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.5em] mb-4 block">
              // cultural festivals
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-tight">
              Cultural <span className="italic font-serif normal-case text-amber-600">Festivals</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {festivals.map((festival, index) => (
            <FestivalCard key={festival.slug} festival={festival} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
