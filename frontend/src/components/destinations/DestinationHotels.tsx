"use client";

import { Hotel } from "@/lib/data";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface DestinationHotelsProps {
  hotels: Hotel[];
}

export function DestinationHotels({ hotels }: DestinationHotelsProps) {
  if (hotels.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-xs font-bold tracking-[0.2em] text-black uppercase mb-4">
            Accommodation
          </span>
          <h2 className="text-3xl md:text-5xl font-light">Where to Rest</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group block"
            >
              <div className="relative aspect-16/10 overflow-hidden mb-6">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 text-xs font-bold tracking-widest">
                  {hotel.priceRange}
                </div>
              </div>

              <h3 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
                {hotel.name}
              </h3>

              <div className="flex gap-1 mb-3">
                {[...Array(hotel.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-sm text-black leading-relaxed">
                {hotel.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
