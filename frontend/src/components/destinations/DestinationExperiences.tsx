"use client";

import { Experience } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface DestinationExperiencesProps {
  experiences: Experience[];
  destinationName: string;
}

export function DestinationExperiences({
  experiences,
  destinationName,
}: DestinationExperiencesProps) {
  if (experiences.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="block text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Experiences
            </span>
            <h2 className="text-3xl md:text-5xl font-light">
              Experiences in {destinationName}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={`/experiences/${exp.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {exp.category}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {exp.description}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
