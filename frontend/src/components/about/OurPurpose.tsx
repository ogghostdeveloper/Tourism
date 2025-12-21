"use client";

import { motion } from "framer-motion";

export function OurPurpose() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px] order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2787&auto=format&fit=crop"
              alt="Bhutanese culture"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
              Our Purpose
            </h3>
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8">
              We'll Show You Bhutan
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                In an entirely new light. We believe that the journeys we make,
                make us. This wisdom, inspired by the Bhutanese way of life,
                guides everything we do.
              </p>
              <p>
                When we plan trips for our clients, we strip away the barriers
                that can get between them and the authentic Bhutan. You're
                searching for the unexpected, the unfamiliar, the profound. We
                have the local knowledge and expertise to make it happen.
              </p>
              <p>
                Over the years, we've assembled a team of Bhutan
                enthusiasts—people who live and breathe the Himalayan kingdom
                and everything it represents. They're passionate wanderers with
                the organizational precision of master craftsmen.
              </p>
              <p className="text-black font-light text-xl italic pt-4 border-t border-gray-300">
                "To inspire people through remarkable travel experiences in the
                Land of the Thunder Dragon."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
