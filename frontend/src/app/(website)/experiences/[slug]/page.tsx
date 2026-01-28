import { notFound } from "next/navigation";
import { ExperienceHero } from "./components/experience-hero";
import CallToAction from "@/components/common/call-to-action";
import { LocationMap } from "@/components/common/location-map";
import { ExperienceDetails } from "./components/experience-details";
import { ExperienceGallery } from "./components/experience-gallery";
import { getExperienceBySlug, getAllExperiences } from "../actions";
import { ExperienceCarousel } from "./components/experience-carousel";
import { ExperienceMap } from "./components/experience-map";

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

        {/* Map Section */}
        <ExperienceMap name={experience.title} coordinates={experience.coordinates} />
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
