import { getAllTours } from "./actions";
import Link from "next/link";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import CallToAction from "@/components/shared/CallToAction";

export default async function ToursPage() {
  const tours = await getAllTours();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="h-[60vh] relative">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2940&auto=format&fit=crop"
          alt="Bhutan Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <span className="text-sm font-bold tracking-[0.2em] uppercase mb-6">
            Pre-Packaged Tours
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8">
            Discover Bhutan
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl opacity-90">
            Carefully curated journeys through the Kingdom of Happiness
          </p>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            All Tours
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From spiritual journeys to adventure treks, find the perfect tour that matches your travel style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tours.map((tour, index) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {tour.featured && (
                  <span className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest z-20">
                    Featured
                  </span>
                )}
                {tour.category && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest z-20">
                    {tour.category}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-light mb-3 group-hover:text-gray-600 transition-colors">
                {tour.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {tour.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {tour.price.replace("From ", "")}
                </div>
              </div>

              {tour.highlights && tour.highlights.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <ul className="space-y-2">
                    {tour.highlights.slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mt-1 flex-shrink-0" />
                        <span className="line-clamp-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      <CallToAction />
    </div>
  );
}
