"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Experience } from "@/app/admin/experiences/schema";

interface ExperiencesProps {
  experiences: Experience[];
}

export function Experiences({ experiences }: ExperiencesProps) {
  return (
    <section className="py-40 bg-white text-black relative overflow-hidden border-t border-black/5">
      {/* Decorative Background Text */}
      <div className="absolute top-0 left-0 opacity-[0.02] select-none pointer-events-none">
        <span className="text-[30vw] font-bold uppercase leading-none tracking-tighter text-black">
          Explore
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8 border-b border-black/10 pb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block"
            >
              // intel: field reports
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-light tracking-tighter leading-tight"
            >
              Curated <span className="italic font-serif">Experiences</span>
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/experiences"
              className="group flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 hover:text-black transition-colors"
            >
              <span className="h-px w-12 bg-black/20 group-hover:w-20 group-hover:bg-amber-600 transition-all duration-500" />
              Access All Files
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/experiences/${exp.slug}`}
        className="group relative block h-[600px] overflow-hidden rounded-sm border border-black/5 bg-neutral-100"
      >
        <img
          src={exp.image}
          alt={exp.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Scroll-based white overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-white z-10 pointer-events-none"
        />

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-700 z-20" />

        <div className="absolute inset-0 p-10 flex flex-col justify-between z-30">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] tracking-widest uppercase bg-white/80 backdrop-blur-md px-3 py-1 border border-black/10 text-black">
              ID: EXP-0{index + 1}
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="transform translate-y-4 transition-all duration-500 group-hover:translate-y-0">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-500 mb-4 block">
              {exp.category}
            </span>
            <h4 className="text-4xl font-light tracking-tighter text-white mb-6 group-hover:italic transition-all duration-500 drop-shadow-lg">
              {exp.title}
            </h4>
            <p className="text-gray-200 text-sm font-light leading-relaxed line-clamp-3 italic opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 drop-shadow-md">
              "{exp.description}"
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

