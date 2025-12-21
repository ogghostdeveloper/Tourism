"use client";

import React from "react";
import Link from "next/link";

export default function ExperienceCTA() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2952&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-light text-white mb-8">
                    Start Your Journey
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Let us craft a bespoke itinerary that includes this experience and many more hidden gems of Bhutan.
                </p>
                <Link
                    href="/enquire"
                    className="inline-block bg-white text-black px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                    Enquire Now
                </Link>
            </div>
        </section>
    );
}
