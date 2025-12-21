"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
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
      .attr("fill", "#333333")
      .attr("stroke", "#4b5563")
      .attr("stroke-width", 0.5)
      .attr("class", "transition-colors duration-300 hover:fill-neutral-700");

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
        .attr("fill", "#fbbf24")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text(experience.title);
    }
  }, [geoJsonData, experience]);

  if (loading) {
    return (
      <div className="w-full h-[600px] bg-neutral-900 rounded-sm flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] bg-neutral-900 rounded-sm border border-white/10 overflow-hidden"
    />
  );
}
