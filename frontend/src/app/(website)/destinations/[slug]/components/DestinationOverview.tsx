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
    <section className="py-40 bg-white text-black relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="font-mono text-amber-500 text-xs uppercase tracking-[0.4em] mb-4 block">
              // destination overview
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase">
              The <span className="italic font-serif normal-case text-amber-600">Soul</span> <br />of {name}
            </h2>
            <div className="relative pl-8 border-l border-black/10">
              <p className="text-xl text-gray-500 leading-relaxed font-light italic">
                "{description}"
              </p>
              <div className="mt-8 font-mono text-[8px] text-gray-400 uppercase tracking-widest">
                verified information // Bhutan
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-12 border border-black/5 bg-neutral-50 backdrop-blur-xl group relative overflow-hidden"
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-10">
              <div className="absolute top-0 right-0 w-full h-px bg-black" />
              <div className="absolute top-0 right-0 w-px h-full bg-black" />
            </div>

            <h3 className="font-mono text-xs font-bold tracking-[0.3em] text-black uppercase mb-12">
              Key highlights
            </h3>
            <ul className="space-y-8">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-6 group/item">
                  <span className="font-mono text-[10px] text-amber-600/50 mt-1">[0{index + 1}]</span>
                  <p className="text-gray-500 leading-relaxed font-light group-hover/item:text-black transition-colors duration-500">
                    {highlight}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-16 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/10" />
              <span className="font-mono text-[8px] text-gray-400 tracking-[0.5em] uppercase">End of overview</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
