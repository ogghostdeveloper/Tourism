import { getTourBySlug, getRelatedTours } from "../actions";
import { notFound } from "next/navigation";
import { TourHero } from "./components/TourHero";
import { TourOverview } from "./components/TourOverview";
import { TourBookingCard } from "./components/TourBookingCard";
import { TourItinerary } from "./components/TourItinerary";
import { TourCarousel } from "./components/TourCarousel";
import CallToAction from "@/components/common/call-to-action";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const relatedTours = await getRelatedTours(slug);

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
          <TourOverview tour={tour} />
          <TourBookingCard slug={tour.slug} />
        </div>

        <TourItinerary days={tour.days} slug={tour.slug} />
      </div>

      {/* Related Tours Section */}
      <TourCarousel tours={relatedTours} currentSlug={slug} />
      <CallToAction />
    </div>
  );
}

