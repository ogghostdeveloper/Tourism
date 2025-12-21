import { getExperienceBySlug, getAllExperiences } from "../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Mountain } from "lucide-react";
import ExperienceMap from "./components/ExperienceMap";
import ExperienceGallery from "./components/ExperienceGallery";
import { ExperienceCarousel } from "./components/ExperienceCarousel";
import CallToAction from "@/components/shared/CallToAction";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const allExperiences = await getAllExperiences();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="h-[70vh] relative">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-24">
          <div className="container mx-auto">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block">
              {experience.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              {experience.title}
            </h1>
            <div className="flex gap-8 text-sm font-medium uppercase tracking-wider text-gray-300">
              {experience.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {experience.duration}
                </div>
              )}
              {experience.difficulty && (
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4" /> {experience.difficulty}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Experiences
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-light mb-8">About this Experience</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              {experience.description}
            </p>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 h-fit backdrop-blur-sm">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
              Book Experience
            </h3>
            <p className="text-gray-400 mb-8">
              Ready to embark on this journey? Contact us to include this in
              your custom itinerary.
            </p>
            <Link
              href="/enquire"
              className="block w-full bg-white text-black py-4 text-center text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-light mb-8">Location</h2>
          <ExperienceMap experience={experience} />
        </div>
      </div>

      {/* Gallery Section */}
      {experience.gallery && <ExperienceGallery images={experience.gallery} />}

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
