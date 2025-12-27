"use server";

import * as tourDb from "@/lib/data/tours";
import * as experienceDb from "@/lib/data/experiences";
import * as destinationDb from "@/lib/data/destinations";
import { getTripRequests } from "@/lib/actions";

export async function getDashboardData() {
    try {
        // Fetch counts from MongoDB
        const toursData = await tourDb.listTours(1, 1);
        const experiencesData = await experienceDb.listExperiences(1, 1);
        const destinationsData = await destinationDb.listDestinations(1, 1);

        // Fetch trip requests (currently static but will use the action)
        const tripRequests = await getTripRequests();

        // Recent Activity (last 5 trip requests)
        const recentActivity = tripRequests.slice(0, 5).map(tr => ({
            id: tr.id,
            userName: tr.userName,
            userEmail: tr.userEmail,
            type: tr.type,
            status: tr.status,
            createdAt: tr.createdAt,
            packageName: tr.packageName || tr.destination || "Custom Trip"
        }));

        // For revenue/visitors, we'll return hardcoded but dynamic-looking values for now
        // since we don't have these metrics in the DB yet.
        return {
            stats: {
                totalBookings: tripRequests.length,
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
