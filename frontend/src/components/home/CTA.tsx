import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1578509312291-76752524f58b?q=80&w=2940&auto=format&fit=crop"
                    alt="Bhutan Landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative container mx-auto px-4 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-medium mb-6">
                    Ready to experience the magic of Bhutan?
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Let us craft your perfect journey to the Land of the Thunder Dragon.
                    Bespoke itineraries, unforgettable experiences, and memories to last a lifetime.
                </p>

                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors duration-300"
                >
                    Start Planning
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
