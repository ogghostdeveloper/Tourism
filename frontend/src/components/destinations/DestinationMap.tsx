"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { BhutanMap } from "@/components/ui/BhutanMap";

interface DestinationMapProps {
  name: string;
  coordinates: [number, number];
}

export function DestinationMap({ name, coordinates }: DestinationMapProps) {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="block text-xs font-bold tracking-[0.2em] text-black uppercase mb-4">
            Location
          </span>
          <h2 className="text-3xl md:text-5xl font-light">Where is {name}?</h2>
        </div>

        <div className="relative aspect-video lg:aspect-21/9 bg-[#f3f4f6] rounded-lg overflow-hidden flex items-center justify-center p-8">
          <BhutanMap highlightDestination={name.toLowerCase()} />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-sm z-20"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-black" />
              <span className="text-xs font-bold tracking-widest uppercase text-black">
                {name}
              </span>
            </div>
            <span className="block text-[8px] text-black font-normal mt-1 tracking-normal pl-6">
              {coordinates[0].toFixed(4)}° N, {coordinates[1].toFixed(4)}° E
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
