"use client";

import { motion } from "framer-motion";
import { AboutSection } from "../schema";

interface OurStoryProps {
  story: AboutSection;
}

export function OurStory({ story }: OurStoryProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {story.subtitle && (
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                {story.subtitle}
              </h3>
            )}
            <h2 className="text-4xl md:text-5xl font-light text-black mb-8">
              {story.title}
            </h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              {story.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          {story.image && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] lg:h-[600px]"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
