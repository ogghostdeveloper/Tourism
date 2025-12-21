"use client";

import { motion } from "framer-motion";
import { SustainabilityItem } from "../schema";

interface SustainableTravelProps {
  items: SustainabilityItem[];
}

export function SustainableTravel({ items }: SustainableTravelProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            Sustainability
          </h3>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-8">
            Committed to Sustainable Travel
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Bhutan's approach to tourism is built on sustainability. We're proud
            to uphold and enhance these principles in every journey we create.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-black rounded-full mx-auto flex items-center justify-center text-white text-2xl font-light">
                  {item.order}
                </div>
              </div>
              <h4 className="text-xl font-light text-black mb-4">
                {item.title}
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
