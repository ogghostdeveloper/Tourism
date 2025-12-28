"use server";

import * as tourDb from "@/lib/data/tours";
import * as experienceDb from "@/lib/data/experiences";
import * as destinationDb from "@/lib/data/destinations";
import { tourRequestDb } from "@/lib/data/tour-requests";

export async function getDashboardData() {
    try {
        // Fetch counts from MongoDB
        const toursData = await tourDb.listTours(1, 1);
        const experiencesData = await experienceDb.listExperiences(1, 1);
        const destinationsData = await destinationDb.listDestinations(1, 1);

        // Fetch tour requests (limit to 5 for recent activity)
        const tourRequestsData = await tourRequestDb.getAllTourRequests(1, 5);

        // Recent Activity
        const recentActivity = tourRequestsData.items.map(tr => ({
            id: tr._id,
            userName: `${tr.firstName} ${tr.lastName}`, // Mapping to 'userName' for dashboard compatibility
            userEmail: tr.email,
            type: "Tour Request", // Static type for now
            status: tr.status,
            createdAt: tr.createdAt,
            packageName: tr.tourName || "General Enquiry"
        }));

        // For revenue/visitors, we'll return hardcoded but dynamic-looking values for now
        // since we don't have these metrics in the DB yet.
        return {
            stats: {
                totalBookings: tourRequestsData.total,
                activeTours: toursData.total_items,
                totalExperiences: experiencesData.total_items,
                totalDestinations: destinationsData.total_items,
                revenue: "$2.4M", // Placeholder
                visitors: "45.2k" // Placeholder
            },
            recentActivity
        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw new Error("Failed to fetch dashboard data");
    }
}
