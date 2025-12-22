import {
  getDestinationBySlug,
  getExperiencesByDestination,
  getHotelsByDestination,
} from "@/lib/data";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationHero } from "@/components/destinations/DestinationHero";
import { DestinationOverview } from "@/components/destinations/DestinationOverview";
import { DestinationMap } from "@/components/destinations/DestinationMap";
import { DestinationExperiences } from "@/components/destinations/DestinationExperiences";
import { DestinationFestivals } from "@/components/destinations/DestinationFestivals";
import { DestinationHotels } from "@/components/destinations/DestinationHotels";

interface PageProps {
  params: { id: string };
}

// Destination View Page - Admin
export default async function DestinationViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slug = id;

  if (slug === "new") {
    redirect("/admin/destinations/new/edit");
  }

  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  // Fetch related data
  const experiences = await getExperiencesByDestination(slug);
  const hotels = await getHotelsByDestination(slug);

  // Filter festivals
  const festivals = experiences.filter(
    (exp) =>
      exp.category.toLowerCase().includes("culture") ||
      exp.title.toLowerCase().includes("festival") ||
      exp.slug.includes("festival")
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Fixed Edit Button */}
      <Link
        href={`/admin/destinations/${slug}/edit`}
        className="fixed top-24 right-8 z-50"
      >
        <Button className="bg-black text-white hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center transition-transform hover:scale-110">
          <Pencil className="w-5 h-5" />
        </Button>
      </Link>

      {/* Hero Banner */}
      <DestinationHero
        name={destination.name}
        image={destination.image}
        region={destination.region}
      />

      <div className="container mx-auto px-6 py-12">
        <Link
          href="/admin/destinations"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-black hover:text-black/80 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Destinations
        </Link>
      </div>

      {/* Section 1: Destination Description */}
      <DestinationOverview
        name={destination.name}
        description={destination.description}
        highlights={destination.highlights}
      />

      {/* Section 2: Location on Bhutan map */}
      <DestinationMap
        name={destination.name}
        coordinates={destination.coordinates}
      />

      {/* Section 3: Experience to try in that dzongkhag */}
      <DestinationExperiences
        experiences={experiences}
        destinationName={destination.name}
      />

      {/* Section 4: Popular Festivals */}
      <DestinationFestivals festivals={festivals} />

      {/* Section 5: Where to rest. Hotels */}
      <DestinationHotels hotels={hotels} />
    </div>
  );
}
