"use client";

import { motion } from "framer-motion";
import { Destination } from "../../schema";
import { DestinationCard } from "@/components/common/DestinationCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DestinationCarouselProps {
  destinations: Destination[];
  currentSlug: string;
}

export function DestinationCarousel({
  destinations,
  currentSlug,
}: DestinationCarouselProps) {
  // Filter out current destination
  const otherDestinations = destinations.filter((d) => d.slug !== currentSlug);

  if (otherDestinations.length === 0) return null;

  return (
    <section className="py-40 bg-white border-t border-black/5 relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.03]">
        <span className="text-[30vh] font-bold uppercase leading-none tracking-tighter block rotate-90 origin-top-right">
          Next
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
              // explore more
            </span>
            <h2 className="text-5xl md:text-7xl font-light text-black tracking-tighter leading-tight uppercase">
              Other <span className="italic font-serif normal-case text-amber-600">Regions</span>
            </h2>
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
            {otherDestinations.map((dest, index) => (
              <CarouselItem
                key={dest.slug}
                className="pl-8 md:basis-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <DestinationCard destination={dest as any} index={index} />
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
