"use client";

import { Destination } from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 relative">
        <div className="mb-12">
          <span className="block text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            Explore
          </span>
          <h2 className="text-3xl md:text-5xl font-light">
            Other Destinations
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
            {otherDestinations.map((dest, index) => (
              <CarouselItem
                key={dest.slug}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group block h-full"
                >
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="block h-full"
                  >
                    <div className="aspect-[3/2] overflow-hidden mb-4 relative">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-light mb-1">{dest.name}</h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">
                      {dest.region}
                    </span>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="-right-12 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {/* Mobile controls usually visible or just swipe, keeping swipe for now as default */}
        </Carousel>
      </div>
    </section>
  );
}
