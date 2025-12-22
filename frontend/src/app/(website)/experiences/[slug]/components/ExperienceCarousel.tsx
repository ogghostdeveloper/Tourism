"use client";

import { Experience } from "../../schema";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ExperienceCarouselProps {
  experiences: Experience[];
  currentSlug: string;
}

export function ExperienceCarousel({
  experiences,
  currentSlug,
}: ExperienceCarouselProps) {
  const otherExperiences = experiences.filter((e) => e.slug !== currentSlug);

  if (otherExperiences.length === 0) return null;

  return (
    <section className="py-40 bg-white border-t border-black/5 relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.03]">
        <span className="text-[30vh] font-bold uppercase leading-none tracking-tighter block rotate-90 origin-top-right">
          Next
        </span>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
              // intel: next assignments
            </span>
            <h2 className="text-5xl md:text-7xl font-light text-black tracking-tighter leading-tight">
              Expand Your <span className="italic font-serif">Horizon</span>
            </h2>
          </div>
          <div className="hidden md:block pb-4">
            <div className="flex gap-4">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-right max-w-[150px]">
                [ mission: explore further ]
                <br />
                [ availability: immediate ]
              </p>
            </div>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {otherExperiences.map((experience, index) => (
              <CarouselItem
                key={experience.slug}
                className="pl-8 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/experiences/${experience.slug}`}
                    className="group block relative bg-neutral-100 border border-black/10 hover:border-amber-600/50 transition-all duration-700 rounded-sm overflow-hidden"
                  >
                    {/* Image Container with Reveal */}
                    <div className="aspect-4/5 overflow-hidden relative">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-all duration-1000 saturate-[0.8] group-hover:saturate-[1.2] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />

                      {/* Corner Tags */}
                      <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                        <span className="bg-white/80 backdrop-blur-md px-3 py-1 font-mono text-[9px] tracking-widest border border-black/10 text-black">
                          ID: BTX-{index.toString().padStart(2, '0')}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-md border border-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <ArrowUpRight className="w-4 h-4 text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber-600 mb-4 block">
                        {experience.category}
                      </span>

                      <h3 className="text-3xl font-light text-black mb-6 tracking-tight leading-tight group-hover:italic transition-all">
                        {experience.title}
                      </h3>

                      <div className="flex items-center gap-4 text-gray-500 group-hover:text-black transition-colors">
                        <span className="h-px w-8 bg-black/20 group-hover:w-12 group-hover:bg-amber-600/50 transition-all duration-500" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">Begin Briefing</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-start gap-4 mt-16">
            <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-transparent hover:bg-black/10 text-black rounded-none border border-black/10 hover:border-black/30 transition-all" />
            <CarouselNext className="static translate-y-0 h-14 w-14 bg-transparent hover:bg-black/10 text-black rounded-none border border-black/10 hover:border-black/30 transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
