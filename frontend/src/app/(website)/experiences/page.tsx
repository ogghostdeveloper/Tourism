"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getExperiences } from "./actions";
import type { Experience } from "./schema";

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Get unique categories from experiences
  const categories = [
    "All",
    ...Array.from(new Set(experiences.map((exp) => exp.category))),
  ];

  // Fetch experiences on mount
  useEffect(() => {
    async function fetchExperiences() {
      const data = await getExperiences();
      setExperiences(data);
      setLoading(false);
    }
    fetchExperiences();
  }, []);

  // Filter experiences by category
  const filteredExperiences =
    activeCategory === "All"
      ? experiences
      : experiences.filter((exp) => exp.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading experiences...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-light mb-6"
          >
            Experiences
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover unique ways to experience the Kingdom of Happiness
          </motion.p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-t border-b border-white/10 py-8 sticky top-20 bg-black/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                                    px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-all
                                    ${
                                      activeCategory === category
                                        ? "bg-white text-black"
                                        : "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10"
                                    }
                                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="container mx-auto px-6 py-16">
        {filteredExperiences.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-xl text-gray-400">
              No experiences found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/experiences/${exp.slug}`}
                  className="group relative h-[500px] overflow-hidden block"
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {exp.category}
                      </span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                    </div>

                    <div>
                      <h2 className="text-3xl font-light mb-4">{exp.title}</h2>
                      <p className="text-gray-200 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {exp.description}
                      </p>
                      {exp.duration && (
                        <p className="text-sm text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          Duration: {exp.duration}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
