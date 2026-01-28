"use client";

import { motion } from "framer-motion";
import { Hotel } from "../../schema";
import { HotelCard } from "@/components/common/hotel-card";

interface DestinationHotelsProps {
  hotels: Hotel[];
}

export function DestinationHotels({ hotels }: DestinationHotelsProps) {
  if (hotels.length === 0) return null;

  return (
    <section className="py-40 bg-white text-black relative overflow-hidden">
      {/* Background Decorative ID */}
      <div className="absolute top-0 right-12 font-mono text-[15vw] opacity-[0.03] select-none pointer-events-none font-bold uppercase tracking-tighter">
        Stay
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="block font-mono text-amber-600 text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4"
          >
            // plan your stay
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-black leading-tight">
            Where to <span className="italic font-serif normal-case text-amber-600">Stay</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.id} hotel={hotel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
