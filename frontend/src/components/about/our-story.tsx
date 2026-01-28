"use client";

import { motion } from "framer-motion";

export function OurStory() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
              Our Story
            </h3>
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8">
              It Began with a Feeling
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Our journey started with a deep fascination for Bhutan—a land
                where happiness is measured not in wealth, but in the wellbeing
                of its people and the preservation of its culture.
              </p>
              <p>
                We wanted to create more than just tours. We envisioned
                experiences that would sweep aside the ordinary and connect
                travelers with the extraordinary spirit of the Himalayan
                kingdom.
              </p>
              <p>
                Since our founding, we've become curators of tailor-made travel
                experiences—all crafted with inspirational care and an
                incomparable attention to detail. For us, the most important
                question has always been: how do you want to feel?
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2952&auto=format&fit=crop"
              alt="Taktsang Monastery, Bhutan"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
