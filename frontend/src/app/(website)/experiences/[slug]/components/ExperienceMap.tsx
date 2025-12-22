"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { motion } from "framer-motion";
import { Experience } from "../../schema";

interface ExperienceMapProps {
  experience: Experience;
}

export default function ExperienceMap({ experience }: ExperienceMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        const response = await fetch("/data/Bhutan_ADM2.topojson");
        if (!response.ok) throw new Error("Failed to fetch map data");
        const bhutanData = await response.json();

        const objectKey = Object.keys(bhutanData.objects)[0];
        const featureCollection = topojson.feature(
          bhutanData as any,
          bhutanData.objects[objectKey] as any
        );

        setGeoJsonData(featureCollection);
      } catch (error) {
        console.error("Error loading map data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJson();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !geoJsonData || !experience.coordinates)
      return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 600;

    d3.select(container).selectAll("*").remove();

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background-color", "transparent");

    const projection = d3
      .geoMercator()
      .center([90.4336, 27.5142])
      .translate([width / 2, height / 2]);

    projection.fitSize([width, height], geoJsonData);

    const path = d3.geoPath().projection(projection);

    svg
      .selectAll("path")
      .data(geoJsonData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", "#e5e5e5")
      .attr("stroke", "#d4d4d4")
      .attr("stroke-width", 0.5)
      .attr("class", "transition-colors duration-300 hover:fill-neutral-300");

    const [lat, long] = experience.coordinates;
    const coords = projection([long, lat]);

    if (coords) {
      const ripple = svg
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 8)
        .attr("fill", "none")
        .attr("stroke", "#fbbf24")
        .attr("stroke-width", 1)
        .attr("opacity", 1);

      ripple
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("r", 30)
        .attr("opacity", 0)
        .on("end", function repeat() {
          d3.select(this)
            .attr("r", 8)
            .attr("opacity", 1)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("r", 30)
            .attr("opacity", 0)
            .on("end", repeat);
        });

      svg
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 6)
        .attr("fill", "#fbbf24")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2)
        .attr("class", "cursor-pointer")
        .style("filter", "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))");

      svg
        .append("text")
        .attr("x", coords[0])
        .attr("y", coords[1] - 15)
        .attr("text-anchor", "middle")
        .attr("text-anchor", "middle")
        .attr("fill", "#d97706")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text(experience.title);
    }
  }, [geoJsonData, experience]);

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-neutral-100 rounded-sm flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video lg:aspect-21/9 bg-neutral-100 border border-black/5 rounded-sm overflow-hidden flex items-center justify-center p-12 group transition-all duration-700 hover:border-amber-500/20">
      {/* Tactical Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="tacticalGridExp"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="black"
              strokeWidth="0.1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#tacticalGridExp)" />
        </svg>
      </div>

      {/* Pulsing Radar Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-amber-500/10 rounded-full animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/5 rounded-full animate-pulse delay-500 pointer-events-none" />

      {/* Scanning Line Effect */}
      <motion.div
        animate={{ top: ["100%", "-10%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-600/20 to-transparent z-10"
      />

      <div
        ref={containerRef}
        className="w-full h-full relative z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-1000 grayscale brightness-100 group-hover:grayscale-0"
      />

      {/* Tactical Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-black/10" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-black/10" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-black/10" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-black/10" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute bottom-12 right-12 bg-white/80 backdrop-blur-xl px-8 py-4 border border-black/10 z-20"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-ping" />
            <span className="font-mono text-[10px] tracking-widest text-black uppercase">{experience.title}</span>
          </div>
          <div className="h-px w-full bg-black/5 my-1" />
          <span className="font-mono text-[9px] text-amber-600/60 tracking-wider">
            COORD: {experience.coordinates?.[0].toFixed(4)}°N, {experience.coordinates?.[1].toFixed(4)}°E
          </span>
        </div>
      </motion.div>

      {/* Side Info */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-12 pointer-events-none opacity-20">
        <div className="space-y-1">
          <p className="font-mono text-[8px] text-black uppercase tracking-widest">Map View</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-amber-600/40 rounded-full" />)}
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-mono text-[8px] text-black uppercase tracking-widest">Status</p>
          <p className="font-mono text-[10px] text-black">LOCATION VERIFIED</p>
        </div>
      </div>
    </div>
  );
}
