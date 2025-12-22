"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-40 bg-white relative overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2952&auto=format&fit=crop')] bg-cover bg-center opacity-10 saturate-[0.5]" />
      <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-white" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.5em] mb-4 block">
            // start your journey
          </span>
          <h2 className="text-5xl md:text-8xl font-light text-black tracking-tighter leading-tight mb-8 uppercase">
            Start Your <span className="italic font-serif normal-case opacity-60 text-black">Discovery</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed font-light italic">
            "Let us craft a bespoke itinerary that includes these regional highlights and
            many more hidden gems within the Kingdom."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <Link
              href="/enquire"
              className="group relative inline-flex items-center gap-8 bg-black px-12 py-6 text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-amber-600 overflow-hidden"
            >
              <span className="relative z-10">Plan Your Custom Trip</span>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-500 transition-transform duration-500" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <span className="h-px w-20 bg-black/10" />
              <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest leading-none">
                Verified Partner <br /> Bhutan Tourism Board
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
