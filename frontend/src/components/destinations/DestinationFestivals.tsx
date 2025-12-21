"use client";

import { Experience } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface DestinationFestivalsProps {
  festivals: Experience[];
}

export function DestinationFestivals({ festivals }: DestinationFestivalsProps) {
  if (festivals.length === 0) return null;

  return (
    <section className="py-24 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="block text-xs font-bold tracking-[0.2em] text-white/50 uppercase mb-4">
              Culture
            </span>
            <h2 className="text-3xl md:text-5xl font-light">
              Popular Festivals
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {festivals.map((festival, index) => (
            <motion.div
              key={festival.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors group"
            >
              <Link
                href={`/experiences/${festival.slug}`}
                className="flex flex-col lg:flex-row gap-8 items-center"
              >
                <div className="w-full lg:w-1/3 aspect-square overflow-hidden rounded-sm">
                  <img
                    src={festival.image}
                    alt={festival.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 text-gold-400 mb-2">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs uppercase tracking-widest text-yellow-500">
                      Annual Event
                    </span>
                  </div>
                  <h3 className="text-2xl font-light mb-4 group-hover:text-yellow-500 transition-colors">
                    {festival.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-6">
                    {festival.description}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-1 group-hover:border-yellow-500 transition-colors">
                    Discover More
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
