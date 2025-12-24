"use client";

import { ExperienceCard } from "@/components/common/ExperienceCard";
import { Experience } from "@/app/admin/experiences/schema";

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
    <section className="py-40 bg-white relative overflow-hidden">
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
              Expand Your <span className="italic font-serif normal-case text-amber-600">Horizon</span>
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
                <ExperienceCard
                  experience={{
                    ...experience,
                    image: experience.image || ""
                  } as any}
                  index={index}
                />
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
