"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface BhutanMapProps {
  highlightDestination?: string; // slug of the destination to highlight
}

export function BhutanMap({ highlightDestination }: BhutanMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !geoJsonData) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Clear previous SVG
    d3.select(container).selectAll("*").remove();

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("background-color", "transparent");

    // Create projection
    // Bhutan Bounding Box approx: 88.75, 26.70 to 92.13, 28.33
    const projection = d3
      .geoMercator()
      .center([90.4336, 27.5142]) // Center of Bhutan
      .scale(width * 10) // Initial scale, adjustable
      .translate([width / 2, height / 2]);

    // Auto-fit logic
    projection.fitSize([width, height], geoJsonData);

    const path = d3.geoPath().projection(projection);

    // Draw map
    svg
      .selectAll("path")
      .data(geoJsonData.features)
      .enter()
      .append("path")
      .attr("d", path as any)
      .attr("fill", (d: any) => {
        // Check if this district matches the highlighted destination
        // We need to match destination slug (e.g., "punakha") with TopoJSON property (e.g., "Punakha")
        // The tail output showed "shapeName": "Pemagatshel", "shapeName": "Punakha" etc.
        const districtName = d.properties?.shapeName || "";
        if (
          highlightDestination &&
          districtName.toLowerCase() === highlightDestination.toLowerCase()
        ) {
          return "#fbbf24"; // Highlight color (Amber-400)
        }
        return "#e5e7eb"; // Default gray-200
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .attr("class", "transition-colors duration-300 hover:fill-gray-300")
      .style("cursor", "pointer");

    // Optional: Add labels or interactive tooltips here
  }, [geoJsonData, highlightDestination]);

  return <div ref={containerRef} className="w-full h-full min-h-[400px]" />;
}
