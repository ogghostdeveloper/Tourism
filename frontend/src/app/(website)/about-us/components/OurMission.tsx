"use client";

import { motion } from "framer-motion";
import { MissionItem } from "../schema";

interface OurMissionProps {
  items: MissionItem[];
}

export function OurMission({ items }: OurMissionProps) {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=2940&auto=format&fit=crop"
          alt="Buddhist prayer flags"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
              Our Mission
            </h3>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Unique, Different, and Meaningful
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-xl font-light mb-4">{item.title}</h4>
                <p className="text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
