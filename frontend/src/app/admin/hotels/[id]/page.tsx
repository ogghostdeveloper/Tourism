import { notFound } from "next/navigation";
import { getRelatedHotels } from "@/app/(website)/hotels/actions";
import { getHotelById } from "@/lib/data/hotels";
import { HotelHero } from "@/app/(website)/hotels/[slug]/components/HotelHero";
import { HotelOverview } from "@/app/(website)/hotels/[slug]/components/HotelOverview";
import { VisualGallery } from "@/components/common/VisualGallery";
import { LocationMap } from "@/components/common/LocationMap";
import { RelatedHotels } from "@/app/(website)/hotels/[slug]/components/RelatedHotels";
import CallToAction from "@/components/shared/CallToAction";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelDetailPage({ params }: PageProps) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  if (!hotel) {
    notFound();
  }

  const relatedHotels = await getRelatedHotels(hotel.destinationSlug, hotel.id);

  return (
    <div className="relative min-h-screen bg-white text-black font-sans">
      {/* Admin Floating Edit Button */}
      <Link
        href={`/admin/hotels/${id}/edit`}
        className="fixed top-24 right-8 z-50 text-white"
      >
        <Button className="bg-amber-600 hover:bg-amber-700 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center transition-transform hover:scale-110">
          <Pencil className="w-5 h-5" />
        </Button>
      </Link>

      <HotelHero
        name={hotel.name}
        image={hotel.image}
        location={hotel.location}
        rating={hotel.rating}
        priceRange={hotel.priceRange}
      />

      <HotelOverview
        description={hotel.description}
        amenities={hotel.amenities}
        rooms={hotel.rooms}
      />

      {/* Gallery Section */}
      <VisualGallery
        images={hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.image]}
        title="Interior & Soul"
        subtitle="// architectural narrative"
      />

      {/* Map Section */}
      {hotel.coordinates && (
        <LocationMap
          name={hotel.name}
          coordinates={hotel.coordinates as [number, number]}
          title="Sanctuary Location"
          subtitle="// geographical coordinates"
        />
      )}

      <RelatedHotels hotels={relatedHotels} />

      <CallToAction />
    </div>
  );
}
