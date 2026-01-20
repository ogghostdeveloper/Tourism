import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";

const DB = process.env.MONGODB_DB || "bhutan_tourism";

/**
 * Increment the priority of a tour by 1
 * @param tourId - MongoDB ObjectId string of the tour
 * @returns boolean indicating success
 */
export async function incrementTourPriority(tourId: string): Promise<boolean> {
    try {
        const client = await clientPromise;
        const result = await client.db(DB).collection("tours").updateOne(
            { _id: new ObjectId(tourId) },
            { $inc: { priority: 1 } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error(`Failed to increment tour priority for ${tourId}:`, error);
        return false;
    }
}

/**
 * Increment the priority of an experience by 1
 * @param experienceId - MongoDB ObjectId string of the experience
 * @returns boolean indicating success
 */
export async function incrementExperiencePriority(experienceId: string): Promise<boolean> {
    try {
        const client = await clientPromise;
        const result = await client.db(DB).collection("experiences").updateOne(
            { _id: new ObjectId(experienceId) },
            { $inc: { priority: 1 } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error(`Failed to increment experience priority for ${experienceId}:`, error);
        return false;
    }
}

/**
 * Increment the priority of a destination by 1
 * @param destinationId - MongoDB ObjectId string of the destination
 * @returns boolean indicating success
 */
export async function incrementDestinationPriority(destinationId: string): Promise<boolean> {
    try {
        const client = await clientPromise;
        const result = await client.db(DB).collection("destinations").updateOne(
            { _id: new ObjectId(destinationId) },
            { $inc: { priority: 1 } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error(`Failed to increment destination priority for ${destinationId}:`, error);
        return false;
    }
}

/**
 * Increment the priority of a hotel by 1
 * @param hotelId - MongoDB ObjectId string of the hotel
 * @returns boolean indicating success
 */
export async function incrementHotelPriority(hotelId: string): Promise<boolean> {
    try {
        const client = await clientPromise;
        const result = await client.db(DB).collection("hotels").updateOne(
            { _id: new ObjectId(hotelId) },
            { $inc: { priority: 1 } }
        );
        return result.modifiedCount > 0;
    } catch (error) {
        console.error(`Failed to increment hotel priority for ${hotelId}:`, error);
        return false;
    }
}

/**
 * Increment priorities for multiple items in parallel
 * Extracts unique IDs and increments each priority by 1
 * @param experienceIds - Array of experience IDs (may contain duplicates)
 * @param destinationIds - Array of destination IDs (may contain duplicates)
 * @param hotelIds - Array of hotel IDs (may contain duplicates)
 */
export async function incrementMultiplePriorities(
    experienceIds: string[] = [],
    destinationIds: string[] = [],
    hotelIds: string[] = []
): Promise<void> {
    // Get unique IDs only
    const uniqueExperiences = [...new Set(experienceIds.filter(Boolean))];
    const uniqueDestinations = [...new Set(destinationIds.filter(Boolean))];
    const uniqueHotels = [...new Set(hotelIds.filter(Boolean))];

    // Increment all priorities in parallel for better performance
    const promises: Promise<boolean>[] = [];

    uniqueExperiences.forEach(id => {
        promises.push(incrementExperiencePriority(id));
    });

    uniqueDestinations.forEach(id => {
        promises.push(incrementDestinationPriority(id));
    });

    uniqueHotels.forEach(id => {
        promises.push(incrementHotelPriority(id));
    });

    // Wait for all increments to complete
    // Errors are already logged in individual functions
    await Promise.allSettled(promises);
}
