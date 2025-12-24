import { getExperienceBySlug } from "../actions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Clock, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceMap } from "@/app/(website)/experiences/[slug]/components/ExperienceMap";
import { ExperienceGallery } from "@/app/(website)/experiences/[slug]/components/ExperienceGallery";

interface PageProps {
  params: { id: string };
}

export default async function ExperienceViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slug = id;

  if (slug === "new") {
    redirect("/admin/experiences/new/edit");
  }

  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Edit Button */}
      <Link
        href={`/admin/experiences/${slug}/edit`}
        className="fixed top-24 right-8 z-50"
      >
        <Button className="bg-white text-black hover:bg-gray-200 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center transition-transform hover:scale-110">
          <Pencil className="w-5 h-5" />
        </Button>
      </Link>

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
          href="/admin/experiences"
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
        {experience.coordinates && (
          <div className="mb-20">
            <h2 className="text-3xl font-light mb-8">Location</h2>
            <ExperienceMap experience={experience} />
          </div>
        )}
      </div>

      {/* Gallery Section */}
      {experience.gallery && experience.gallery.length > 0 && (
        <ExperienceGallery experience={experience} />
      )}
    </div>
  );
}
