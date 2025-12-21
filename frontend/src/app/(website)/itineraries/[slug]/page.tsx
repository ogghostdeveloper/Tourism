import { getItineraryBySlug } from "@/lib/data/itineraries";
import { notFound } from "next/navigation";
import { ItineraryTimeline } from "@/components/itinerary/ItineraryTimeline";
import { ArrowLeft, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ItineraryPage({ params }: PageProps) {
    const { slug } = await params;
    const itinerary = await getItineraryBySlug(slug);

    if (!itinerary) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Hero */}
            <div className="h-[80vh] relative">
                <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase mb-6">
                        Packaged Plan
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
                        {itinerary.title}
                    </h1>
                    <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> {itinerary.duration}
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> {itinerary.price}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-light mb-8">Itinerary Overview</h2>
                        <p className="text-xl text-gray-600 leading-relaxed mb-16">
                            {itinerary.description}
                        </p>

                        <h3 className="text-2xl font-light mb-8">Day by Day</h3>
                        <ItineraryTimeline days={itinerary.days} slug={itinerary.slug} />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-gray-50 p-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
                                Book This Journey
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Customize this itinerary to your preferences. Our travel experts are
                                ready to help you plan your perfect trip to Bhutan.
                            </p>
                            <button className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors mb-4">
                                Enquire Now
                            </button>
                            <p className="text-xs text-gray-500 text-center">
                                * Prices are subject to seasonality and availability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
