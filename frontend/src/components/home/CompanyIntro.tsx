"use client";

import { motion } from "framer-motion";

export function CompanyIntro() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500 mb-8">
            Our Story
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-black leading-relaxed">
            We are dedicated to crafting{" "}
            <span className="italic font-serif">transformative journeys</span>{" "}
            that honor Bhutan's rich cultural heritage, pristine environment,
            and the philosophy of{" "}
            <span className="font-medium">Gross National Happiness</span>. Each
            experience is thoughtfully curated to create meaningful connections
            between travelers and the Kingdom of the Thunder Dragon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
