import { getAllTours } from "./actions";
import Link from "next/link";
import { ArrowUpRight, Calendar, DollarSign } from "lucide-react";
import CallToAction from "@/components/shared/CallToAction";
import { ToursHeader } from "./components/ToursHeader";

export default async function ToursPage() {
  const tours = await getAllTours();

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <ToursHeader />

      <div className="container mx-auto px-6 pb-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/5 pb-12 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase mb-2">
              The <span className="italic font-serif normal-case">Selected</span> Journeys
            </h2>
            <p className="text-gray-500 font-light italic">
              "A collection of verified expeditions curated for deep discovery."
            </p>
          </div>
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest text-right">
            Total Results: {tours.length} // BHU-EXP-2025
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
          {tours.map((tour, index) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-neutral-100 border border-black/5 mb-8">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-all duration-1000 saturate-[0.7] brightness-[1.05] group-hover:saturate-[1.2] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/5 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />

                {tour.featured && (
                  <span className="absolute top-6 right-6 bg-black text-white px-3 py-1 font-mono text-[8px] uppercase tracking-[0.4em] z-20">
                    Featured
                  </span>
                )}

                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-amber-500" />
                  <span className="font-mono text-[10px] text-white uppercase tracking-[0.2em] drop-shadow-md font-bold">
                    Visual Record // BHU-EXP
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="font-mono text-[11px] text-amber-600 uppercase tracking-[0.3em] font-bold">
                      {tour.category || "Expedition"}
                    </span>
                    <span className="w-1 h-1 bg-black/20 rounded-full" />
                    <div className="flex items-center gap-6 text-[11px] font-mono text-gray-500 uppercase tracking-widest font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-black/40" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-black/5 rounded-sm text-black">
                        <DollarSign className="w-3.5 h-3.5" />
                        {tour.price.replace("From ", "")}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-5xl md:text-6xl font-light tracking-tighter text-black group-hover:italic transition-all duration-500 line-clamp-1 uppercase">
                    {tour.title}
                  </h3>
                </div>

                <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:border-amber-500 transition-colors ml-6 shrink-0">
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>

              <p className="mt-8 text-gray-600 font-light leading-relaxed max-w-xl line-clamp-2 italic text-lg">
                "{tour.description}"
              </p>

              {/* Decorative ID */}
              <div className="absolute top-0 -right-4 font-mono text-[9px] tracking-[0.6em] text-gray-300 rotate-90 origin-top-left py-4 border-l border-black/5 uppercase">
                LOG // {tour.slug.split('-')[0].toUpperCase()}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CallToAction />
    </div>
  );
}
