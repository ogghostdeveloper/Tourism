"use server";

import * as tourDb from "@/lib/data/tours";
import { Tour, PaginatedTours } from "./schema";
import { revalidatePath } from "next/cache";

export async function getTours(page: number = 1, pageSize: number = 10): Promise<PaginatedTours> {
    try {
        const data = await tourDb.listTours(page, pageSize);
        return data as PaginatedTours;
    } catch (error) {
        console.error("Error fetching tours:", error);
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

export async function getTourBySlug(slug: string): Promise<Tour | null> {
    try {
        const tour = await tourDb.getTourBySlug(slug);
        return tour as Tour | null;
    } catch (error) {
        console.error("Error fetching tour by slug:", error);
        return null;
    }
}

export async function getTourById(id: string): Promise<Tour | null> {
    try {
        const tour = await tourDb.getTourById(id);
        return tour as Tour | null;
    } catch (error) {
        console.error("Error fetching tour by id:", error);
        return null;
    }
}

export async function createTourAction(data: Partial<Tour>) {
    try {
        const id = await tourDb.createTour(data);
        revalidatePath("/admin/tours");
        revalidatePath("/tours");
        return { success: true, id };
    } catch (error) {
        console.error("Error creating tour:", error);
        return { success: false, message: "Failed to create tour" };
    }
}

export async function updateTourAction(id: string, data: Partial<Tour>) {
    try {
        await tourDb.updateTour(id, data);
        revalidatePath("/admin/tours");
        revalidatePath(`/admin/tours/${id}`);
        revalidatePath("/tours");
        revalidatePath(`/tours/${data.slug}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating tour:", error);
        return { success: false, message: "Failed to update tour" };
    }
}

export async function deleteTourAction(id: string) {
    try {
        await tourDb.deleteTour(id);
        revalidatePath("/admin/tours");
        revalidatePath("/tours");
        return { success: true };
    } catch (error) {
        console.error("Error deleting tour:", error);
        return { success: false, message: "Failed to delete tour" };
    }
}
