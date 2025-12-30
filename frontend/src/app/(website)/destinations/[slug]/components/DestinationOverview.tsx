"use client";

import { motion } from "framer-motion";

interface DestinationOverviewProps {
  name: string;
  description: string;
  slug: string;
}

export function DestinationOverview({
  name,
  description,
  slug,
}: DestinationOverviewProps) {
  return (
    <section className="py-40 bg-white text-black relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-8"
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
            className="sticky top-32 lg:col-span-4"
          >
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
                  Ref: {slug.toUpperCase()} <br />
                  Auth: Kingdom Access
                </div>
                <div className="text-right">
                  Status: <br /> Ready
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
