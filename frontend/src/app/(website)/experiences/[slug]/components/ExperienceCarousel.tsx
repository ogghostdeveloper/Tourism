"use client";

import { Experience } from "../../schema";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <section className="py-24 bg-neutral-900 border-t border-white/10">
      <div className="container mx-auto px-6 relative">
        <div className="mb-12">
          <span className="block text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            Discover More
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white">
            You May Also Like
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {otherExperiences.map((experience, index) => (
              <CarouselItem
                key={experience.slug}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group block h-full"
                >
                  <Link
                    href={`/experiences/${experience.slug}`}
                    className="block h-full group"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6 relative">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>

                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-3 block">
                      {experience.category}
                    </span>

                    <h3 className="text-2xl font-light text-white mb-4 group-hover:text-gray-300 transition-colors">
                      {experience.title}
                    </h3>

                    <span className="inline-flex items-center gap-2 text-sm text-gray-400 border-b border-transparent group-hover:border-gray-400 group-hover:text-white transition-all pb-1">
                      Explore{" "}
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 bg-white/10 hover:bg-white text-white hover:text-black border-none" />
            <CarouselNext className="-right-12 bg-white/10 hover:bg-white text-white hover:text-black border-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
