"use client";

import { motion } from "framer-motion";

export function WhyBhutan() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                Why Bhutan?
              </h3>
              <h2 className="text-4xl md:text-5xl font-light text-black mb-8">
                The Last Shangri-La
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Nestled in the Eastern Himalayas, Bhutan is a kingdom unlike
                  any other. It's a place where ancient Buddhist monasteries
                  cling to cliffsides, where prayer flags flutter in mountain
                  winds, and where happiness is a national priority.
                </p>
                <p>
                  While the world rushes forward, Bhutan moves at its own
                  pace—deliberately, thoughtfully, sustainably. The kingdom
                  limits tourism to preserve its culture and environment, making
                  every visit a rare and remarkable privilege.
                </p>
                <p>
                  This is not a destination for ticking boxes. It's a journey
                  for those seeking transformation, connection, and a glimpse
                  into a way of life that values spirit over speed, and
                  community over commerce.
                </p>
                <p className="text-black font-light text-lg italic pt-4 border-t border-gray-300">
                  "In Bhutan, we discovered something rare and remarkable—a
                  place that changes you from within."
                </p>
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2940&auto=format&fit=crop"
                  alt="Buddhist monastery"
                  className="w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1599501611976-d6bbb5a8f3e9?q=80&w=2787&auto=format&fit=crop"
                  alt="Bhutanese architecture"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2787&auto=format&fit=crop"
                  alt="Traditional Bhutanese dress"
                  className="w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2952&auto=format&fit=crop"
                  alt="Bhutanese festival"
                  className="w-full h-48 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
