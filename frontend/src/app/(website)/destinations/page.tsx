import Link from "next/link";
import { getDestinations } from "./actions";

export default async function DestinationsPage() {
    const destinations = await getDestinations();

    return (
        <div className="min-h-screen bg-white text-black pt-20">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-5xl md:text-7xl font-light mb-16 text-center">
                    Destinations
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {destinations.map((dest) => (
                        <Link
                            key={dest.slug}
                            href={`/destinations/${dest.slug}`}
                            className="group block"
                        >
                            <div className="aspect-[16/9] overflow-hidden mb-6">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex justify-between items-baseline">
                                <h2 className="text-3xl font-light group-hover:text-gray-600 transition-colors">
                                    {dest.name}
                                </h2>
                                <span className="text-sm text-gray-500 uppercase tracking-widest">
                                    {dest.region}
                                </span>
                            </div>
                            <p className="mt-4 text-gray-600 line-clamp-2">
                                {dest.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
