"use client";

import { Experience } from "../../schema";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 pb-12 border-b border-black/5">
          <div className="max-w-2xl">
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
              // local experiences
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight uppercase">
              Explore: <span className="italic font-serif normal-case">{destinationName}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {displayedExperiences.map((exp, index) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index % 3 * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/experiences/${exp.slug}`} className="group relative block aspect-4/5 overflow-hidden rounded-sm border border-black/5 bg-neutral-100">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 saturate-[0.8] group-hover:saturate-[1.2] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-widest uppercase bg-white/80 backdrop-blur-md px-3 py-1 border border-black/10 text-black">
                      ID: {index.toString().padStart(2, '0')}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5 text-black" />
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-4 block">
                      {exp.category}
                    </span>
                    <h3 className="text-4xl font-light tracking-tighter text-black mb-6 group-hover:italic group-hover:text-black transition-all duration-500">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="h-px w-8 bg-black/20 group-hover:w-16 group-hover:bg-amber-600/50 transition-all duration-500" />
                      <span className="font-mono text-[9px] uppercase tracking-widest">View Experience</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
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
