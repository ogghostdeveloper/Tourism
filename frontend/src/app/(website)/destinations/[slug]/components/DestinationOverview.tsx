"use client";

import { motion } from "framer-motion";

interface DestinationOverviewProps {
  name: string;
  description: string;
  highlights: string[];
}

export function DestinationOverview({
  name,
  description,
  highlights,
}: DestinationOverviewProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Overview
            </span>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
              Discovering {name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 p-10 border border-gray-100"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] text-black uppercase mb-8">
              Key Highlights
            </h3>
            <ul className="space-y-6">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <span className="mt-2 w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-black transition-colors" />
                  <span className="text-sm text-gray-600 leading-relaxed font-light">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
