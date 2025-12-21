import { getItineraryDay, getRelatedItineraries } from "@/lib/data/itineraries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BedDouble, MapPin, Camera } from "lucide-react";
import { ExperienceCard } from "@/components/itinerary/ExperienceCard";

interface PageProps {
    params: Promise<{ slug: string; day: string }>;
}

export default async function ItineraryDayPage({ params }: PageProps) {
    const { slug, day } = await params;
    const dayNumber = parseInt(day);
    const data = await getItineraryDay(slug, dayNumber);

    if (!data) {
        notFound();
    }

    const { dayData, itinerary } = data;
    const relatedItineraries = await getRelatedItineraries(slug);

    const prevDay = dayNumber > 1 ? dayNumber - 1 : null;
    const nextDay = dayNumber < itinerary.days.length ? dayNumber + 1 : null;

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Hero */}
            <div className="h-[60vh] relative">
                <img
                    src={dayData.image || itinerary.image}
                    alt={dayData.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase mb-4 opacity-80">
                        {itinerary.title}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4">
                        Day {dayData.day}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-light opacity-90">
                        {dayData.title}
                    </h2>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {/* Navigation Top */}
                <div className="flex justify-between items-center mb-12 border-b border-gray-100 pb-8">
                    <Link
                        href={`/itineraries/${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Itinerary
                    </Link>
                    <div className="flex gap-4">
                        {prevDay && (
                            <Link
                                href={`/itineraries/${slug}/day/${prevDay}`}
                                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Day {prevDay}
                            </Link>
                        )}
                        {nextDay && (
                            <Link
                                href={`/itineraries/${slug}/day/${nextDay}`}
                                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                            >
                                Day {nextDay} <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h3 className="text-3xl font-light mb-6">Overview</h3>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {dayData.description}
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Stay */}
                            {dayData.accommodation && (
                                <div className="bg-gray-50 p-8">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                        <BedDouble className="w-4 h-4" /> Stay
                                    </h4>
                                    <p className="text-xl font-light">{dayData.accommodation}</p>
                                </div>
                            )}

                            {/* Do */}
                            {dayData.activities && dayData.activities.length > 0 && (
                                <div className="bg-gray-50 p-8">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                        <MapPin className="w-4 h-4" /> Do
                                    </h4>
                                    <ul className="space-y-3">
                                        {dayData.activities.map((activity, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-700">
                                                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                                                {activity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* See */}
                            {dayData.highlights && dayData.highlights.length > 0 && (
                                <div className="bg-gray-50 p-8 md:col-span-2">
                                    <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                        <Camera className="w-4 h-4" /> See
                                    </h4>
                                    <div className="flex flex-wrap gap-4">
                                        {dayData.highlights.map((highlight, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Experiences */}
                        {dayData.experiences && dayData.experiences.length > 0 && (
                            <div className="mb-24">
                                <h3 className="text-3xl font-light mb-12">Curated Experiences</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {dayData.experiences.map((experience, index) => (
                                        <ExperienceCard key={index} experience={experience} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-black text-white p-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
                                Interested in this day?
                            </h3>
                            <p className="text-gray-300 mb-8">
                                This is just one part of the {itinerary.title} journey. Customize it to your liking.
                            </p>
                            <button className="w-full bg-white text-black py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors">
                                Enquire Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Journeys */}
                {relatedItineraries.length > 0 && (
                    <div className="border-t border-gray-100 pt-24">
                        <h3 className="text-3xl font-light mb-12 text-center">
                            Similar Journeys
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedItineraries.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/itineraries/${related.slug}`}
                                    className="group block"
                                >
                                    <div className="aspect-[4/3] overflow-hidden mb-6 relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                        <img
                                            src={related.image}
                                            alt={related.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <h4 className="text-xl font-medium mb-2 group-hover:text-gray-600 transition-colors">
                                        {related.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 uppercase tracking-widest">
                                        {related.duration}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
