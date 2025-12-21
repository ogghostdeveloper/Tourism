import { getAllPackages } from "@/lib/data/packages";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: { id: string };
}

export default async function PackageViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    redirect("/admin/packages/new/edit");
  }

  const packages = await getAllPackages();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Fixed Edit Button */}
      <Link
        href={`/admin/packages/${id}/edit`}
        className="fixed top-24 right-8 z-50"
      >
        <Button className="bg-black text-white hover:bg-gray-800 shadow-lg rounded-full w-12 h-12 p-0 flex items-center justify-center transition-transform hover:scale-110">
          <Pencil className="w-5 h-5" />
        </Button>
      </Link>

      {/* Hero */}
      <div className="h-[60vh] relative">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            {pkg.name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 text-sm font-medium">
                <Clock className="w-4 h-4" />
                {pkg.duration}
              </span>
              <span className="flex items-center gap-2 text-gray-600 bg-gray-100 px-3 py-1 text-sm font-medium">
                <DollarSign className="w-4 h-4" />
                {pkg.price}
              </span>
            </div>

            <h2 className="text-3xl font-light mb-8">Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {pkg.description}
            </p>

            <h3 className="text-2xl font-light mb-6">Highlights</h3>
            <ul className="space-y-4 mb-12">
              {pkg.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-gray-600"
                >
                  <span className="w-2 h-2 bg-black rounded-full" />
                  {highlight}
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-light mb-6">Included</h3>
            <ul className="space-y-4">
              {pkg.included.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-gray-600"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-8 h-fit">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6">
              Itinerary Details
            </h3>
            <div className="space-y-6">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Destinations
                </span>
                <div className="flex flex-wrap gap-2">
                  {pkg.destinations.map((dest, i) => (
                    <span
                      key={i}
                      className="bg-white border border-gray-200 px-2 py-1 text-sm text-gray-600"
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Experiences
                </span>
                <div className="flex flex-wrap gap-2">
                  {pkg.experiences.map((exp, i) => (
                    <span
                      key={i}
                      className="bg-white border border-gray-200 px-2 py-1 text-sm text-gray-600"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Slug
                </span>
                <span className="text-sm font-mono text-gray-600">
                  {pkg.slug}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
