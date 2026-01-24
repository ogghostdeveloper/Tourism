import { getExperienceBySlug, getAllExperiences } from "../actions";
import { notFound } from "next/navigation";
import { ExperienceHero } from "./components/ExperienceHero";
import { ExperienceDetails } from "./components/ExperienceDetails";
import { LocationMap } from "@/components/common/LocationMap";
import { ExperienceGallery } from "./components/ExperienceGallery";
import { ExperienceCarousel } from "./components/ExperienceCarousel";
import CallToAction from "@/components/shared/CallToAction";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [experience, allExperiences] = await Promise.all([
    getExperienceBySlug(slug),
    getAllExperiences()
  ]);

  if (!experience) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <ExperienceHero
        title={experience.title}
        image={experience.image}
        category={experience.category}
        duration={experience.duration}
        difficulty={experience.difficulty}
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
