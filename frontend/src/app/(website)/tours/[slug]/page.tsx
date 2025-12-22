import { getTourBySlug } from "../actions";
import { notFound } from "next/navigation";
import { TourTimeline } from "./components/TourTimeline";
import { ArrowLeft, Clock, DollarSign, MapPin, Tag, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { TourHero } from "./components/TourHero";
import CallToAction from "@/components/shared/CallToAction";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <TourHero
        title={tour.title}
        image={tour.image}
        category={tour.category}
        duration={tour.duration}
        price={tour.price}
      />

      <div className="container mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-40">
          {/* Overview Section */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-12">
              <div className="max-w-3xl">
                <span className="font-mono text-amber-600 text-[13px] uppercase tracking-[0.4em] mb-4 block font-bold">
                  // expedition overview
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase text-black">
                  The <span className="italic font-serif normal-case opacity-40">Narrative</span> <br />of {tour.title}
                </h2>
                <div className="relative pl-8 border-l border-black/10">
                  <p className="text-2xl text-gray-600 leading-relaxed font-light italic">
                    "{tour.description}"
                  </p>
                  <div className="mt-8 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-3 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Verified Expedition Details // Kingdom of Bhutan
                  </div>
                </div>
              </div>

              {tour.highlights && tour.highlights.length > 0 && (
                <div className="p-12 border border-black/5 bg-neutral-50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-[0.05]">
                    <div className="absolute top-0 right-0 w-full h-px bg-black" />
                    <div className="absolute top-0 right-0 w-px h-full bg-black" />
                  </div>

                  <h3 className="font-mono text-[13px] font-bold tracking-[0.3em] text-black uppercase mb-12">
                    Key Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-6 group/item">
                        <span className="font-mono text-[11px] text-amber-600 mt-1 font-bold">[0{index + 1}]</span>
                        <p className="text-gray-600 leading-relaxed font-light group-hover/item:text-black transition-colors duration-500 italic text-base">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Booking Card */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="relative p-10 border border-black/5 bg-white shadow-xs overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-amber-500/20 group-hover:border-amber-500/50 transition-colors" />

              <span className="font-mono text-[10px] text-amber-600 uppercase tracking-[0.5em] mb-8 block font-bold">
                // reserve discovery
              </span>

              <h3 className="text-4xl font-light tracking-tighter text-black mb-8 uppercase italic serif">
                Plan Your <span className="font-serif">Adventure</span>
              </h3>

              <p className="text-gray-600 font-light leading-relaxed mb-12 italic text-base">
                "Our travel specialists will weave this tour into your personal Bhutanese story. Secure your place in the Kingdom."
              </p>

              <div className="space-y-6">
                <a
                  href="/enquire"
                  className="group relative flex items-center justify-center gap-6 bg-black py-6 text-white text-[11px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-amber-600 overflow-hidden"
                >
                  <span className="relative z-10">Start Planning</span>
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-500 transition-transform duration-500" />
                </a>

                <div className="flex items-center justify-center gap-4 py-4 border-y border-black/5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-bold">Guide availability confirmed</span>
                </div>
              </div>

              {/* Additional Meta */}
              <div className="mt-12 pt-8 border-t border-black/5 text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] leading-loose flex justify-between items-end font-bold">
                <div>
                  Ref: {tour.slug.toUpperCase()} <br />
                  Auth: Kingdom Access
                </div>
                <div className="text-right">
                  Status: <br /> Ready
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections Below */}
        <div className="border-t border-black/5 pt-40">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-24">
              <div>
                <span className="font-mono text-amber-600 text-[13px] uppercase tracking-[0.4em] mb-4 block font-bold">
                  // expedition itinerary
                </span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase text-black">
                  Day by <span className="italic font-serif normal-case opacity-40">Day</span>
                </h2>
              </div>
              <div className="hidden md:block font-mono text-[10px] text-gray-400 uppercase tracking-widest text-right font-bold">
                Sequence Certified // Total Days: {tour.days.length}
              </div>
            </div>

            <TourTimeline days={tour.days} slug={tour.slug} />
          </div>
        </div>
      </div>

      <CallToAction />
    </div>
  );
}
