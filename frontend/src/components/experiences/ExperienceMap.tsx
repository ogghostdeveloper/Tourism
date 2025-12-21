"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Experience } from "@/lib/data";

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
        // Use the same high-quality local data as Destination Map
        const response = await fetch("/data/Bhutan_ADM2.topojson");
        if (!response.ok) throw new Error("Failed to fetch map data");
        const bhutanData = await response.json();

        // Check keys to find the object name
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

    // Clear previous SVG
    d3.select(container).selectAll("*").remove();

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background-color", "transparent"); // Transparent to blend with page bg

    // Create projection matching the Destination Map's centering
    const projection = d3
      .geoMercator()
      .center([90.4336, 27.5142])
      .translate([width / 2, height / 2]);

    // Auto-fit logic to ensure Bhutan fills the view nicely
    projection.fitSize([width, height], geoJsonData);

    const path = d3.geoPath().projection(projection);

    // Draw map
    svg
      .selectAll("path")
      .data(geoJsonData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", "#333333") // Dark gray for dark theme
      .attr("stroke", "#4b5563") // Gray-600 stroke
      .attr("stroke-width", 0.5)
      .attr("class", "transition-colors duration-300 hover:fill-neutral-700");

    // Add experience location marker
    const [lat, long] = experience.coordinates;
    // GeoJSON uses [long, lat]
    const coords = projection([long, lat]);

    if (coords) {
      // Ripple effect (underneath)
      const ripple = svg
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 8)
        .attr("fill", "none")
        .attr("stroke", "#fbbf24")
        .attr("stroke-width", 1)
        .attr("opacity", 1);

      function repeat() {
        ripple
          .attr("r", 8)
          .attr("opacity", 1)
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("r", 24)
          .attr("opacity", 0)
          .on("end", repeat);
      }
      repeat();

      // Main marker
      svg
        .append("circle")
        .attr("cx", coords[0])
        .attr("cy", coords[1])
        .attr("r", 6)
        .attr("fill", "#fbbf24") // Amber-400
        .attr("stroke", "#000")
        .attr("stroke-width", 2);

      // Label
      svg
        .append("text")
        .attr("x", coords[0])
        .attr("y", coords[1] - 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#fbbf24")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.1em")
        .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)")
        .text(experience.title);
    }
  }, [geoJsonData, experience]);

  return (
    <div
      className="w-full h-[600px] bg-neutral-900/50 rounded-lg overflow-hidden relative border border-white/10"
      ref={containerRef}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 bg-neutral-900">
          <span className="animate-pulse">Loading Map...</span>
        </div>
      )}
    </div>
  );
}
