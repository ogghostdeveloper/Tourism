"use client";

import { Experience } from "../../schema";
import { ExperienceCard } from "@/components/common/ExperienceCard";
import { useState } from "react";

interface DestinationExperiencesProps {
  experiences: Experience[];
  destinationName: string;
}

export function DestinationExperiences({
  experiences,
  destinationName,
}: DestinationExperiencesProps) {
  const [displayCount, setDisplayCount] = useState(6);

  if (experiences.length === 0) return null;

  const displayedExperiences = experiences.slice(0, displayCount);
  const hasMore = displayCount < experiences.length;

  return (
    <section className="py-40 bg-white text-black border-t border-black/5 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 pb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
              // local experiences
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight uppercase">
              Explore: <span className="italic font-serif normal-case text-amber-600">{destinationName}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedExperiences.map((exp, index) => (
            <ExperienceCard key={exp.slug} experience={exp} index={index} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-24">
            <button
              onClick={() => setDisplayCount((prev) => prev + 6)}
              className="group flex items-center gap-6 font-mono text-xs uppercase tracking-[0.4em] text-gray-500 hover:text-black transition-colors"
            >
              <span className="h-px w-12 bg-black/20 group-hover:w-24 group-hover:bg-amber-600 transition-all duration-700" />
              Load More Experiences
              <span className="h-px w-12 bg-black/20 group-hover:w-24 group-hover:bg-amber-600 transition-all duration-700" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
