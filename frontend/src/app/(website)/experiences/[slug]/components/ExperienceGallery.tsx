"use client";

import React from "react";
import { motion } from "framer-motion";

interface ExperienceGalleryProps {
  images: string[];
}

export default function ExperienceGallery({ images }: ExperienceGalleryProps) {
  if (!images || images.length === 0) return null;

  const displayImages =
    images.length < 3 ? [...images, ...images].slice(0, 3) : images.slice(0, 3);

  return (
    <section className="py-24 bg-black relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16">
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
            Visual Journey
          </h2>
          <span className="text-gray-500 text-sm uppercase tracking-[0.2em] mt-4 md:mt-0">
            Immerse Yourself
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:h-[70vh] min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-8 relative overflow-hidden rounded-sm group h-full"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img
              src={displayImages[0]}
              alt="Experience Highlight"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </motion.div>

          <div className="md:col-span-4 flex flex-col gap-4 h-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative flex-1 overflow-hidden rounded-sm group"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img
                src={displayImages[1]}
                alt="Detail View"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative flex-1 overflow-hidden rounded-sm group"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img
                src={displayImages[2] || displayImages[0]}
                alt="Atmosphere"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
