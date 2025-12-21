import { getTourBySlug } from "../actions";
import { notFound } from "next/navigation";
import { TourTimeline } from "./components/TourTimeline";
import { ArrowLeft, Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

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
      {/* Hero */}
      <div className="h-[80vh] relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-sm font-bold tracking-[0.2em] uppercase mb-6">
            {tour.category || "Packaged Tour"}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            {tour.title}
          </h1>
          <div className="flex gap-8 text-sm font-medium uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {tour.duration}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> {tour.price}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tours
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-light mb-8">Tour Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {tour.description}
            </p>

            {tour.highlights && tour.highlights.length > 0 && (
              <div className="mb-16 bg-gray-50 p-8">
                <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
                  Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <h3 className="text-2xl font-light mb-8">Day by Day Itinerary</h3>
            <TourTimeline days={tour.days} slug={tour.slug} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gray-50 p-8">
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
                Book This Journey
              </h3>
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{tour.category || "Adventure"}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="text-xl font-light">{tour.price}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-8 text-sm">
                Customize this itinerary to your preferences. Our travel experts are
                ready to help you plan your perfect trip to Bhutan.
              </p>
              <Link
                href="/enquire"
                className="block w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors mb-4 text-center"
              >
                Enquire Now
              </Link>
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
