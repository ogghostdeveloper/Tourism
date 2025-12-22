"use client";

import { motion } from "framer-motion";

export function CompanyIntro() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-8 block">
            // our story
          </span>
          <p className="text-xl md:text-3xl font-light text-black leading-relaxed">
            We are dedicated to crafting transformative journeys that honor
            Bhutan's rich cultural heritage, pristine environment, and the
            philosophy of Gross National Happiness. Each experience is
            thoughtfully curated to create meaningful connections between
            travelers and the Kingdom of the Thunder Dragon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
