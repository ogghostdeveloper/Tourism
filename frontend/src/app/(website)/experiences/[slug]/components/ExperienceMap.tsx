"use client";

import { LocationMap } from "@/components/common/location-map";
import { Experience } from "../../schema";

interface ExperienceMapProps {
    experience: Experience;
}

export function ExperienceMap({ experience }: ExperienceMapProps) {
    if (!experience.coordinates) return null;

    return (
        <LocationMap
            name={experience.title}
            coordinates={experience.coordinates}
            title="Experience Location"
            subtitle="// precise coordinates"
        />
    );
}
