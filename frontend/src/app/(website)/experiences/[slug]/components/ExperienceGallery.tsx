"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Experience } from "@/app/admin/experiences/schema";
import { ExperienceLightbox } from "@/app/(website)/experiences/[slug]/components/ExperienceLightbox";

interface ExperienceGalleryProps {
  experience: Experience;
}

export function ExperienceGallery({ experience }: ExperienceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const images = experience.gallery || [];
  if (!images || images.length === 0) return null;

  // Use up to 5 images for the story, repeat if needed
  const storyImages = images.length >= 5 ? images : [...images, ...images, images[0], images[1], images[0]].slice(0, 6);

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <section ref={containerRef} className="bg-white text-black py-40 overflow-hidden relative">
      {/* Background Section Title (Parallax) */}
      <motion.div
        style={{ y: y1, opacity: 0.05 }}
        className="absolute top-20 left-0 right-0 pointer-events-none select-none"
      >
        <span className="text-[20vw] font-bold uppercase whitespace-nowrap leading-none tracking-tighter text-black">
          {experience.title}
        </span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Intro Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-black/10 pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
              // journey: {experience.category}
            </span>
            <h2 className="text-6xl md:text-8xl font-light tracking-tighter leading-tight mb-8">
              The <span className="italic font-serif">Visual</span> <br />Experience
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:text-right"
          >
            <p className="font-mono text-gray-500 text-[10px] uppercase tracking-widest max-w-[200px] md:ml-auto">
              [ Location: {experience.coordinates?.join(', ') || 'Bhutan'} ]
              <br />
              [ Intensity: {experience.difficulty || 'Standard'} ]
            </p>
          </motion.div>
        </div>

        {/* Narrative Grid */}
        <div className="space-y-40 md:space-y-80">

          {/* Section 1: Split Focus */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div
              style={{ y: y2 }}
              className="md:col-span-12 lg:col-span-8 group cursor-pointer"
              onClick={() => setSelectedImage(0)}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-neutral-100 border border-black/5">
                <motion.img
                  style={{ scale }}
                  src={storyImages[0]}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-white/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-widest border border-black/20 text-black">
                    VIEW 01 // OVERVIEW
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section 2: Asymmetric Overlap */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="hidden lg:block lg:col-span-1" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 lg:col-span-5 relative z-20 group cursor-pointer"
              onClick={() => setSelectedImage(1)}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 border border-black/5 rotate-[-1deg] hover:rotate-0 transition-transform duration-700">
                <img src={storyImages[1]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute -bottom-12 -right-12 md:top-24 md:-right-24 max-w-[200px] bg-white/40 backdrop-blur-xl p-8 border border-black/10 hidden md:block group-hover:border-amber-600/50 transition-colors">
                <h3 className="font-mono text-xs text-amber-600 mb-4 tracking-[0.2em] uppercase">Discovery</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  Capturing the subtle nuances that define the spirit of {experience.title}.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="md:col-span-6 lg:col-span-5 md:mt-40 group cursor-pointer"
              onClick={() => setSelectedImage(2)}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-sm bg-neutral-100 border border-black/5 rotate-[1deg] hover:rotate-0 transition-transform duration-700">
                <img src={storyImages[2]} className="w-full h-full object-cover" />
              </div>
              <div className="mt-8">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">VIEW 02 // DETAIL</span>
              </div>
            </motion.div>
          </div>

          {/* Section 3: Full Screen Cinematic */}
          <div className="-mx-6 md:-mx-24 lg:-mx-48 relative overflow-hidden h-[90vh] group cursor-pointer" onClick={() => setSelectedImage(3)}>
            <motion.div
              style={{ scale }}
              className="absolute inset-0"
            >
              <img src={storyImages[3]} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <span className="font-mono text-amber-500 text-xs tracking-[0.5em] mb-6 block uppercase">Immersion Point</span>
                <h2 className="text-4xl md:text-7xl font-light text-white italic font-serif leading-tight">
                  Beyond the <br /> Visible Horizon
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Section 4: Mission Briefing Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(4)}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm border border-white/5 relative">
                <img src={storyImages[4]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                  <span className="font-mono text-[10px] tracking-widest text-amber-400">DETAIL: 07</span>
                </div>
              </div>
            </motion.div>
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="p-12 border border-black/10 bg-neutral-50 backdrop-blur-sm"
              >
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-black mb-6">Experience Summary</h4>
                <p className="text-gray-600 font-light leading-relaxed mb-8 italic">
                  "{experience.description.substring(0, 150)}..."
                </p>
                <div className="flex gap-4">
                  <span className="h-px flex-1 bg-black/20 my-auto" />
                  <span className="font-mono text-[8px] text-gray-500">VERIFIED INFORMATION</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-video overflow-hidden rounded-sm border border-black/5 group cursor-pointer"
                onClick={() => setSelectedImage(5)}
              >
                <img src={storyImages[5]} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      <ExperienceLightbox
        images={storyImages}
        isOpen={selectedImage !== null}
        startIndex={selectedImage ?? 0}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
