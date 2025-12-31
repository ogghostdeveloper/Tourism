import { notFound } from "next/navigation";
import { getExperienceBySlug, getAllExperiences } from "@/app/(website)/experiences/actions";
import { ExperienceHero } from "@/app/(website)/experiences/[slug]/components/ExperienceHero";
import { ExperienceDetails } from "@/app/(website)/experiences/[slug]/components/ExperienceDetails";
import { LocationMap } from "@/components/common/LocationMap";
import { ExperienceGallery } from "@/app/(website)/experiences/[slug]/components/ExperienceGallery";
import { ExperienceCarousel } from "@/app/(website)/experiences/[slug]/components/ExperienceCarousel";
import CallToAction from "@/components/shared/CallToAction";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExperienceViewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperienceViewPage({
  params,
}: ExperienceViewPageProps) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const allExperiences = await getAllExperiences();

  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Fixed Edit Button */}
      <Link
        href={`/admin/experiences/${slug}/edit`}
        className="fixed top-24 right-8 z-50"
      >
        <Button className="bg-amber-600 text-white hover:bg-amber-700 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center transition-transform hover:scale-110">
          <Pencil className="w-5 h-5" />
        </Button>
      </Link>

      <ExperienceHero
        title={experience.title}
        image={experience.image}
        category={experience.category}
        duration={experience.duration || undefined}
        difficulty={experience.difficulty || undefined}
        startDate={experience.startDate || undefined}
        endDate={experience.endDate || undefined}
      />

      <div className="container mx-auto px-6 py-40">
        <ExperienceDetails experience={experience} />

        {/* Gallery Section */}
        {experience.gallery && (
          <ExperienceGallery experience={experience} />
        )}

        {/* Full Width Sections Below */}
        {/* Map Section */}
        {experience.coordinates && (
          <LocationMap
            name={experience.title}
            coordinates={experience.coordinates}
            title="Map Location"
            subtitle="// regional geodata"
          />
        )}
      </div>

      {/* Similar Experiences */}
      <ExperienceCarousel
        currentSlug={experience.slug}
        experiences={allExperiences}
      />

      {/* CTA */}
      <CallToAction />
    </div>
  );
}
