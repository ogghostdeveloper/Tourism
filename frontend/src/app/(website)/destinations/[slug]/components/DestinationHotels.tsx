"use client";

import { Hotel } from "../../schema";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
            className="block font-mono text-amber-600 text-xs uppercase tracking-[0.5em] mb-4"
          >
            // plan your stay
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase whitespace-nowrap">
            Where to <span className="italic font-serif normal-case opacity-60 text-black">Stay</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="group relative block aspect-4/5 overflow-hidden rounded-sm border border-black/5 bg-neutral-100 pointer-events-auto cursor-pointer">
                {/* Image Layer */}
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 saturate-[0.8] group-hover:saturate-[1.2] group-hover:scale-110"
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/30 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />

                {/* Card UI */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] tracking-widest uppercase bg-white/80 backdrop-blur-md px-3 py-1 border border-black/10 text-black">
                      REF: {hotel.priceRange}
                    </span>
                    <div className="flex gap-1 group-hover:gap-2 transition-all duration-500">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <div key={i} className="w-1 h-3 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-4 block">
                      Tier {hotel.rating} Hospitality
                    </span>
                    <h3 className="text-4xl font-light tracking-tighter text-black mb-6 group-hover:italic group-hover:text-black transition-all duration-500">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2 italic mb-6">
                      "{hotel.description}"
                    </p>
                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="h-px w-8 bg-black/20 group-hover:w-16 group-hover:bg-amber-600/50 transition-all duration-500" />
                      <span className="font-mono text-[9px] uppercase tracking-widest">View Accommodation</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
