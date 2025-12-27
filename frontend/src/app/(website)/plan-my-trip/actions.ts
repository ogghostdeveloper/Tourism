"use server";

import * as tourDb from "@/lib/data/tours";
import * as destinationDb from "@/lib/data/destinations";
import * as experienceDb from "@/lib/data/experiences";
import { tourRequestDb } from "@/lib/data/tour-requests";
import { Tour } from "../tours/schema";
import { Destination } from "../destinations/schema";
import { Experience } from "../experiences/schema";

export interface PlanMyTripData {
    packages: Tour[];
    destinations: Destination[];
    experiences: Experience[];
}

export async function getPlanMyTripData(): Promise<PlanMyTripData> {
    try {
        const [allTours, allDestinations, allExperiences] = await Promise.all([
            tourDb.getAllTours(),
            destinationDb.getAllDestinations(),
            experienceDb.getAllExperiences()
        ]);

        // Filter packages if needed (e.g. only featured or specific category)
        // For now we return the top 4 featured or general tours as "packages"
        const packages = (allTours.filter((t: any) => t.featured).slice(0, 4)) as Tour[];
        // Fallback if no featured tours
        const finalPackages = packages.length > 0 ? packages : (allTours.slice(0, 4) as Tour[]);

        return {
            packages: finalPackages,
            destinations: allDestinations as Destination[],
            experiences: allExperiences as Experience[]
        };

    } catch (error) {
        console.error("Error fetching Plan My Trip data:", error);
        return {
            packages: [],
            destinations: [],
            experiences: []
        };
    }
}

export async function submitTourRequest(data: any) {
    try {
        await tourRequestDb.createTourRequest(data);
        return { success: true };
    } catch (error) {
        console.error("Failed to submit tour request:", error);
        return { success: false, error: "Submission failed" };
    }
}
