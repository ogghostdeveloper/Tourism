"use client";

import { motion } from "framer-motion";

export function OurMission() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2940&auto=format&fit=crop"
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-light mb-4">Authentic Connections</h4>
              <p className="text-gray-300 leading-relaxed">
                We curate trips for travelers who want to see Bhutan up
                close—foregoing tourist traps in favor of deeper and more
                intimate connections with the culture and its people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xl font-light mb-4">Sustainable Tourism</h4>
              <p className="text-gray-300 leading-relaxed">
                Our commitment to sustainable tourism aligns with Bhutan's
                philosophy of preserving its pristine environment and rich
                cultural heritage for future generations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-xl font-light mb-4">Local Communities</h4>
              <p className="text-gray-300 leading-relaxed">
                Every journey we design supports local communities, from
                family-run homestays to traditional craftsmen, ensuring your
                travel makes a positive impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="text-xl font-light mb-4">Tailored Experiences</h4>
              <p className="text-gray-300 leading-relaxed">
                We design all journeys from the ground up, ensuring no two trips
                are ever quite alike. Your experience will be as unique as you
                are.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
