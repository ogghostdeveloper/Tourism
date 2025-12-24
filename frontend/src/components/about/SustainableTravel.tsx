"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Leaf, Users, Mountain } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Carbon Negative",
    description:
      "Bhutan is the world's only carbon-negative country, absorbing more CO₂ than it produces.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Supporting local communities through sustainable tourism and cultural preservation.",
  },
  {
    icon: Heart,
    title: "Gross National Happiness",
    description:
      "Aligned with Bhutan's philosophy of measuring prosperity through wellbeing, not wealth.",
  },
  {
    icon: Mountain,
    title: "Protected Environment",
    description:
      "Over 70% of Bhutan remains forested, protected by constitutional mandate.",
  },
];

export function SustainableTravel() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Our Commitment
            </h3>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Sustainable Travel
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              A Lasting Impact for a Changing World
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            At the heart of our mission is a commitment to sustainable and
            regenerative tourism. We believe travel should leave a positive
            impact on our planet and the communities we visit.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Bhutan's unique approach to tourism—prioritizing quality over
            quantity—aligns perfectly with our values. Every journey we create
            supports local economies, preserves cultural heritage, and protects
            the pristine Himalayan environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <Icon className="w-12 h-12 text-white" strokeWidth={1} />
                </div>
                <h4 className="text-lg font-light mb-3">{value.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/enquire"
            className="inline-block bg-white text-black px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
