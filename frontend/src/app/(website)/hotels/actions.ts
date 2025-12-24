"use server";

import * as hotelDb from "@/lib/data/hotels";
import { Hotel } from "./schema";

export async function getHotels(page: number = 1, pageSize: number = 12) {
    try {
        const data = await hotelDb.listHotels(page, pageSize);
        return data;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return {
            items: [],
            page,
            page_size: pageSize,
            total_pages: 0,
            has_next: false,
            has_prev: false,
            total_items: 0,
        };
    }
}

export async function getHotelById(id: string): Promise<Hotel | null> {
    try {
        const hotel = await hotelDb.getHotelById(id);
        return hotel as Hotel | null;
    } catch (error) {
        console.error("Error fetching hotel by id:", error);
        return null;
    }
}

export async function getRelatedHotels(destinationSlug: string, excludeId: string, limit: number = 3): Promise<Hotel[]> {
    try {
        const all = await hotelDb.getAllHotels();
        return all
            .filter((h) => h.destinationSlug === destinationSlug && h.id !== excludeId)
            .slice(0, limit) as Hotel[];
    } catch (error) {
        console.error("Error fetching related hotels:", error);
        return [];
    }
}

export async function getAllHotels(): Promise<Hotel[]> {
    try {
        const data = await hotelDb.getAllHotels();
        return data as Hotel[];
    } catch (error) {
        console.error("Error fetching all hotels:", error);
        return [];
    }
}

export async function getBestHotels(limit: number = 6): Promise<Hotel[]> {
    try {
        const data = await hotelDb.getAllHotels();
        // Ideally we would sort by rating or featured flag, but for now we just take the first N
        return data.slice(0, limit) as Hotel[];
    } catch (error) {
        console.error("Error fetching best hotels:", error);
        return [];
    }
}
