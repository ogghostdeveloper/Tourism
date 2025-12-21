"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    title: "Trekking",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1546708973-b3396c0531f0?q=80&w=2940&auto=format&fit=crop",
    description:
      "Traverse the pristine Himalayan trails, from the famous Snowman Trek to the scenic Druk Path.",
  },
  {
    title: "Festivals",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2952&auto=format&fit=crop",
    description:
      "Witness the vibrant Tshechus, where masked dances and spiritual celebrations come alive.",
  },
  {
    title: "Wellness",
    category: "Relaxation",
    image:
      "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2940&auto=format&fit=crop",
    description:
      "Rejuvenate your mind and body with traditional hot stone baths and meditation retreats.",
  },
];

export function Experiences() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4"
            >
              Experiences
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light"
            >
              Curated for You
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/experiences"
              className="text-sm font-medium uppercase tracking-wider border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors"
            >
              View All Experiences
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative h-[500px] overflow-hidden cursor-pointer"
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
                  <h4 className="text-3xl font-light mb-4">{exp.title}</h4>
                  <p className="text-gray-200 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
