import { getTourDay, getRelatedTours } from "../../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BedDouble, MapPin, Camera, ShieldCheck, Plus, ChevronLeft, ChevronRight, Clock, ArrowRightLeft, Star } from "lucide-react";
import { DayHero } from "../../components/DayHero";
import { ExperienceCard } from "@/components/common/experience-card";
import { TravelMap } from "@/components/common/travel-map";
import { TourCarousel } from "../../components/TourCarousel";
import CallToAction from "@/components/common/call-to-action";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string; day: string }>;
}

export default async function TourDayPage({ params }: PageProps) {
  const { slug, day } = await params;
  const dayNumber = parseInt(day);
  const data = await getTourDay(slug, dayNumber);

  if (!data) {
    notFound();
  }

  const { dayData, tour, hotel, experiences } = data;
  const relatedTours = await getRelatedTours(slug);

  const prevDay = dayNumber > 1 ? dayNumber - 1 : null;
  const nextDay = dayNumber < tour.days.length ? dayNumber + 1 : null;

  return (
    <div className="min-h-screen bg-white text-black">
      <DayHero
        dayNumber={dayNumber}
        title={dayData.title}
        image={dayData.image || tour.image}
        tourTitle={tour.title}
      />

      {/* Narrative & Protocol Controls */}
      <div className="container mx-auto px-6 py-12">
        {/* Superior Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8 pb-12">
          <Link
            href={`/tours/${slug}`}
            className="group flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.4em] text-gray-500 hover:text-black transition-all font-bold"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            [ Back to Main Narrative ]
          </Link>

          <div className="flex items-center gap-8">
            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest hidden lg:block font-bold">
              Sequence Registry // Kingdom of Bhutan
            </div>
            <div className="flex bg-black/5 p-1 rounded-sm">
              {prevDay ? (
                <Link
                  href={`/tours/${slug}/day/${prevDay}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-mono border border-black/5 uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                >
                  <ChevronLeft className="w-3 h-3" /> Prev
                </Link>
              ) : (
                <div className="px-6 py-3 text-gray-300 text-[10px] font-mono uppercase tracking-widest cursor-not-allowed">
                  Start
                </div>
              )}
              {nextDay ? (
                <Link
                  href={`/tours/${slug}/day/${nextDay}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-mono border-l-0 border border-black/5 uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                >
                  Next <ChevronRight className="w-3 h-3" />
                </Link>
              ) : (
                <div className="px-6 py-3 text-gray-300 text-[10px] font-mono uppercase tracking-widest border-l-0 border border-black/5 cursor-not-allowed">
                  End
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-40">
          {/* Detailed Briefing */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-12">
              <div className="max-w-3xl">
                <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
                  // daily briefing log: {dayNumber < 10 ? `0${dayNumber}` : dayNumber}
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase">
                  The <span className="italic font-serif normal-case text-amber-600">Experience</span> <br />of {dayData.title}
                </h2>
                <div className="relative pl-8 border-l border-black/10">
                  <p className="text-xl text-gray-500 leading-relaxed font-light italic">
                    "{dayData.description}"
                  </p>
                  <div className="mt-8 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-3 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Verified Logistics // Sequence Authenticated
                  </div>
                </div>
              </div>

              {/* Protocol Details Grid: Itinerary Items */}
              {dayData.items && dayData.items.length > 0 && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-black/5" />
                    <h3 className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400">Planned Sequence</h3>
                    <div className="h-px flex-1 bg-black/5" />
                  </div>

                  <div className="space-y-16 relative">
                    {/* Timeline vertical line */}
                    <div className="absolute left-[23px] top-4 bottom-4 w-px bg-black/5 hidden md:block" />

                    {dayData.items.map((item: any, idx: number) => {
                      // Pre-resolve experience object if available
                      const experience = item.type === "experience" && experiences
                        ? experiences.find((e: any) => e._id === item.experienceId)
                        : null;

                      return (
                        <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start group">
                          {/* Timeline Dot */}
                          <div className="absolute left-[19px] top-6 w-[9px] h-[9px] rounded-full border border-amber-600 bg-white z-10 hidden md:block group-hover:bg-amber-600 transition-colors" />

                          <div className="md:w-16 pt-5">
                            <span className="font-mono text-[10px] text-gray-300 font-bold hidden md:block">
                              [{idx < 9 ? `0${idx + 1}` : idx + 1}]
                            </span>
                          </div>

                          <div className="flex-1 w-full">
                            {item.type === "travel" ? (
                              <div className="space-y-4">
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="p-2 bg-blue-50 rounded-full">
                                    <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-600 font-bold">Transfer Operations</h4>
                                </div>

                                <TravelMap
                                  from={item.travel.from}
                                  to={item.travel.to}
                                  fromCoordinates={item.travel.fromCoordinates}
                                  toCoordinates={item.travel.toCoordinates}
                                />

                                {(item.travel.location || item.travel.timing) && (
                                  <div className="flex gap-8 pt-4 ml-2">
                                    {item.travel.location && (
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-3 h-3 text-gray-400" />
                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{item.travel.location}</span>
                                      </div>
                                    )}
                                    {item.travel.timing && (
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{item.travel.timing}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="p-2 bg-amber-50 rounded-full">
                                    <Star className="w-4 h-4 text-amber-600" />
                                  </div>
                                  <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Curated Experience</h4>
                                </div>

                                {experience ? (
                                  <ExperienceCard experience={experience} index={idx} />
                                ) : (
                                  <div className="bg-neutral-50/50 p-8 rounded-sm border border-black/5">
                                    <p className="text-gray-400 italic text-sm">Experience data unavailable</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Legacy Activities if no items */}
              {(!dayData.items || dayData.items.length === 0) && dayData.activities && dayData.activities.length > 0 && (
                <div className="bg-white p-12 hover:bg-neutral-50 transition-colors duration-500 group border border-black/5">
                  <h4 className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-amber-600 mb-8 font-bold">
                    <MapPin className="w-4 h-4" /> [ Strategic Objectives ]
                  </h4>
                  <ul className="space-y-6">
                    {dayData.activities.map((activity: string, index: number) => (
                      <li key={index} className="flex items-start gap-4 group/item">
                        <span className="font-mono text-[10px] text-gray-300 mt-1">[0{index + 1}]</span>
                        <p className="text-gray-500 leading-relaxed font-light italic group-hover/item:text-black transition-colors duration-300">
                          {activity}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Base Operations (Hotel) */}
              {(hotel || dayData.accommodation) && (
                <div className="mt-12 bg-black text-white p-12 rounded-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16 transition-transform group-hover:rotate-0" />

                  <h4 className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-amber-500 mb-8 font-bold">
                    <BedDouble className="w-4 h-4" /> [ Base Operations ]
                  </h4>

                  {hotel ? (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2">
                          {Array.from({ length: hotel.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <h3 className="text-4xl font-light italic serif tracking-tight">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-400 font-light leading-relaxed italic text-lg">
                          "{hotel.description}"
                        </p>
                        <div className="flex items-center gap-4 font-mono text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                          {hotel.priceRange} // Luxury Verified
                        </div>
                      </div>
                      <div className="aspect-[4/3] rounded-sm overflow-hidden border border-white/10">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-mono text-gray-400 block mb-2 uppercase tracking-widest font-bold">
                        Accommodation Verified:
                      </span>
                      <p className="text-3xl font-light italic uppercase tracking-tight">
                        {dayData.accommodation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {dayData.highlights && dayData.highlights.length > 0 && (
                <div className="mt-12 pt-8 border-t border-black/5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Mission Objectives</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayData.highlights.map((highlight: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-light group">
                        <span className="mt-1.5 w-1 h-1 bg-amber-500 rounded-full group-hover:scale-150 transition-transform" />
                        <span className="leading-relaxed group-hover:text-black transition-colors">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Reserve Briefing */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="relative p-10 border border-black/5 bg-white shadow-xs overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-amber-500/20 group-hover:border-amber-500/50 transition-colors" />

              <span className="font-mono text-[10px] text-amber-600 uppercase tracking-[0.5em] mb-8 block font-bold">
                // reserve discovery
              </span>

              <h3 className="text-3xl font-light tracking-tighter text-black mb-8 uppercase italic serif">
                Plan This <span className="font-serif normal-case">Journey</span>
              </h3>

              <p className="text-gray-600 font-light leading-relaxed mb-12 italic text-base">
                "Our travel specialists can expand this specific day or refine the entire {tour.title} expedition to your liking."
              </p>

              <div className="space-y-6">
                <a
                  href="/enquire"
                  className="group relative flex items-center justify-center gap-6 bg-black py-6 text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-amber-600 overflow-hidden"
                >
                  <span className="relative z-10">Request Briefing</span>
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-amber-500 transition-transform duration-500" />
                </a>
              </div>

              {/* Additional Meta */}
              <div className="mt-12 pt-8 border-t border-black/5 text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] leading-loose flex justify-between items-end font-bold">
                <div>
                  Ref: {tour.slug.toUpperCase()} <br />
                  Log: Sequence-{dayNumber < 10 ? `0${dayNumber}` : dayNumber}
                </div>
                <div className="text-right">
                  Status: <br /> Active
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Similar Journeys */}
      <TourCarousel tours={relatedTours} currentSlug={slug} />
      <CallToAction />
    </div>
  );
}
