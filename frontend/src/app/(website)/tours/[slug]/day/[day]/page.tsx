import { getTourDay, getRelatedTours } from "../../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BedDouble, MapPin, Camera, ShieldCheck, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { DayHero } from "../../components/DayHero";
import { ExperienceCard } from "../../components/ExperienceCard";
import CallToAction from "@/components/shared/CallToAction";

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

  const { dayData, tour } = data;
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
      <div className="container mx-auto px-6 py-24">
        {/* Superior Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8 pb-12 border-b border-black/5">
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
                  // daily briefing log: 0{dayNumber}
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase">
                  The <span className="italic font-serif normal-case opacity-40">Experience</span> <br />of {dayData.title}
                </h2>
                <div className="relative pl-8 border-l border-black/10">
                  <p className="text-2xl text-gray-600 leading-relaxed font-light italic">
                    "{dayData.description}"
                  </p>
                  <div className="mt-8 font-mono text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-3 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Verified Logistics // Sequence Authenticated
                  </div>
                </div>
              </div>

              {/* Protocol Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5 overflow-hidden">
                {dayData.accommodation && (
                  <div className="bg-white p-12 hover:bg-neutral-50 transition-colors duration-500 group">
                    <h4 className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-amber-600 mb-8 font-bold">
                      <BedDouble className="w-4 h-4" /> [ Base Operations ]
                    </h4>
                    <span className="text-xs font-mono text-gray-400 block mb-2 uppercase tracking-widest font-bold">
                      Accommodation Verified:
                    </span>
                    <p className="text-2xl font-light italic group-hover:italic uppercase tracking-tight">
                      {dayData.accommodation}
                    </p>
                  </div>
                )}

                {dayData.activities && dayData.activities.length > 0 && (
                  <div className="bg-white p-12 hover:bg-neutral-50 transition-colors duration-500 group">
                    <h4 className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-amber-600 mb-8 font-bold">
                      <MapPin className="w-4 h-4" /> [ Strategic Objectives ]
                    </h4>
                    <ul className="space-y-6">
                      {dayData.activities.map((activity, index) => (
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

                {dayData.highlights && dayData.highlights.length > 0 && (
                  <div className="bg-white p-12 md:col-span-2 border-t border-black/5 hover:bg-neutral-50 transition-colors duration-500 group">
                    <h4 className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.4em] text-amber-600 mb-8">
                      <Camera className="w-4 h-4" /> [ Visual Records ]
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {dayData.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="px-6 py-2 bg-black text-white font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group-hover:bg-amber-600 transition-colors font-bold"
                        >
                          <Plus className="w-4 h-4" /> {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Day Experiences */}
              {dayData.experiences && dayData.experiences.length > 0 && (
                <div className="mt-24">
                  <div className="flex items-center justify-between mb-16 pb-8 border-b border-black/5">
                    <h3 className="text-3xl font-light tracking-tighter uppercase italic serif">
                      Curated <span className="font-serif">Moments</span>
                    </h3>
                    <div className="hidden md:block font-mono text-[8px] text-gray-300 uppercase tracking-widest">
                      Deep Discovery Registry
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {dayData.experiences.map((experience, index) => (
                      <ExperienceCard key={index} experience={experience} />
                    ))}
                  </div>
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
                Plan This <span className="font-serif">Journey</span>
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
                  Log: Sequence-0{dayNumber}
                </div>
                <div className="text-right">
                  Status: <br /> Active
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Journeys */}
        {relatedTours.length > 0 && (
          <div className="border-t border-black/5 pt-40">
            <div className="flex items-center justify-between mb-24">
              <div>
                <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.4em] mb-4 block">
                  // similar narratives
                </span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter uppercase">
                  Other curated <span className="italic font-serif normal-case opacity-40">Expeditions</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {relatedTours.map((related, index) => (
                <Link
                  key={related.slug}
                  href={`/tours/${related.slug}`}
                  className="group relative"
                >
                  <div className="relative aspect-16/10 overflow-hidden rounded-sm bg-neutral-100 border border-black/5 mb-8">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-all duration-1000 saturate-[0.7] brightness-[1.05] group-hover:saturate-[1.2] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-700" />

                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                      <span className="h-px w-10 bg-amber-500" />
                      <span className="font-mono text-[10px] text-white uppercase tracking-widest drop-shadow-md font-bold">
                        Discovery Ready
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="font-mono text-[11px] text-amber-600 uppercase tracking-widest mb-2 block font-bold">
                        {related.duration} // BHU-EXP
                      </span>
                      <h3 className="text-4xl font-light tracking-tighter text-black group-hover:italic transition-all duration-500 uppercase line-clamp-1">
                        {related.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-amber-500 transition-colors ml-4 shrink-0">
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <CallToAction />
    </div>
  );
}
