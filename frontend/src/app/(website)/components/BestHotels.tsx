"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { Hotel } from "@/app/admin/hotels/schema";

interface BestHotelsProps {
  hotels: Hotel[];
}

export function BestHotels({ hotels }: BestHotelsProps) {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-black/5 relative overflow-hidden">
      {/* Background Decorative ID */}
      <div className="absolute top-0 right-12 font-mono text-[15vw] opacity-[0.03] select-none pointer-events-none font-bold uppercase tracking-tighter">
        Stay
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-6 block">
              // where to stay
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase leading-tight mb-8 text-black">
              Best <span className="italic font-serif normal-case text-black/60">Hotels</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              href="/hotels"
              className="group inline-flex items-center gap-2 text-[10px] font-mono font-medium tracking-[0.3em] uppercase hover:text-amber-600 transition-all text-gray-400 border-b border-transparent hover:border-amber-600 pb-1"
            >
              View All Hotels
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.id} hotel={hotel} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/hotels/${hotel.id}`}>
        <div className="group relative block aspect-4/5 overflow-hidden rounded-sm border border-black/5 bg-neutral-100 pointer-events-auto cursor-pointer">
          {/* Image Layer */}
          <img
            src={hotel.image}
            alt={hotel.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Scroll-based white overlay */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-white z-10 pointer-events-none"
          />

          {/* Cinematic Overlays */}
          {/* Removed bg-white/40 to show full color */}
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/30 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700 z-20" />

          {/* Card UI */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between z-30">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[9px] tracking-widest uppercase bg-white/80 backdrop-blur-md px-3 py-1 border border-black/10 text-black">
                REF: {hotel.priceRange}
              </span>
              <div className="flex gap-1 group-hover:gap-2 transition-all duration-500">
                {[...Array(Math.floor(typeof hotel.rating === 'string' ? parseFloat(hotel.rating) : hotel.rating || 5))].slice(0, 5).map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-4 block">
                Hospitality
              </span>
              <h4 className="text-3xl font-light tracking-tighter text-black mb-6 group-hover:italic group-hover:text-black transition-all duration-500 line-clamp-2">
                {hotel.name}
              </h4>
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
      </Link>
    </motion.div>
  );
}
