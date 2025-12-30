"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { Hotel } from "@/app/admin/hotels/schema";

interface BestHotelsProps {
  hotels: Hotel[];
}

export function BestHotels({ hotels }: BestHotelsProps) {
  return (
    <section className="py-24 bg-gray-50">
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
              Where to Stay
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-light text-black"
            >
              Best Hotels
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/hotels"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase hover:gap-4 transition-all text-black"
            >
              View All Hotels
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/hotels/${hotel.id}`}>
                <div className="relative overflow-hidden aspect-[4/5] mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 z-10" />
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-black">
                      {hotel.rating}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-light text-black group-hover:text-gray-600 transition-colors">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">
                      {hotel.priceRange}
                    </span>
                    <span className="text-xs text-gray-500">
                      {hotel.rooms} rooms
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {hotel.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
