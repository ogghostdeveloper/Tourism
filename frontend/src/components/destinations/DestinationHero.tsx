"use client";

import { motion } from "framer-motion";

interface DestinationHeroProps {
  name: string;
  image: string;
  region: string;
}

export function DestinationHero({ name, image, region }: DestinationHeroProps) {
  return (
    <div className="h-[80vh] relative overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          {region}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-6xl md:text-9xl font-light tracking-tight"
        >
          {name}
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-12 bg-white/50" />
      </motion.div>
    </div>
  );
}
