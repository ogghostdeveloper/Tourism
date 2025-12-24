"use client";

import { motion } from "framer-motion";
import { Destination } from "@/app/(website)/destinations/schema";
import { DestinationCard } from "@/components/common/DestinationCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface DestinationsProps {
    destinations: Destination[];
}

export function Destinations({ destinations }: DestinationsProps) {
    // Guard against empty destinations
    if (!destinations || destinations.length === 0) {
        return null;
    }

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
                            // explore by region
                        </span>
                        <h2 className="text-5xl md:text-7xl font-light text-black tracking-tighter leading-tight uppercase">
                            Featured <span className="italic font-serif normal-case text-amber-600">Destinations</span>
                        </h2>
                    </motion.div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-8">
                        {destinations.map((destination, index) => (
                            <CarouselItem
                                key={destination.slug}
                                className="pl-8 md:basis-1/2 lg:basis-1/2"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <DestinationCard destination={destination} index={index} />
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons below the carousel */}
                    <div className="flex justify-start gap-4 mt-16">
                        <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-transparent hover:bg-black/5 text-black rounded-none border border-black/10 hover:border-black/30 transition-all" />
                        <CarouselNext className="static translate-y-0 h-14 w-14 bg-transparent hover:bg-black/5 text-black rounded-none border border-black/10 hover:border-black/30 transition-all" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}
