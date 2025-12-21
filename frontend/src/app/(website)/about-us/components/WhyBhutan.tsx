"use client";

import { motion } from "framer-motion";
import {
  Smile,
  Mountain,
  Heart,
  Sparkles,
  Leaf,
  Key,
  LucideIcon,
} from "lucide-react";
import { WhyBhutanItem } from "../schema";

interface WhyBhutanProps {
  items: WhyBhutanItem[];
}

const iconMap: Record<string, LucideIcon> = {
  smile: Smile,
  mountain: Mountain,
  heart: Heart,
  sparkles: Sparkles,
  leaf: Leaf,
  key: Key,
};

export function WhyBhutan({ items }: WhyBhutanProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
            Why Bhutan
          </h3>
          <h2 className="text-4xl md:text-5xl font-light text-black mb-8">
            The Kingdom of Happiness
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Discover what makes Bhutan one of the world's most unique and
            remarkable destinations for conscious travelers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Smile;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 border-2 border-black rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                </div>
                <h4 className="text-xl font-light text-black mb-4">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
