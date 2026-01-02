"use server";

import { tourRequestDb } from "@/lib/data/tour-requests";
import { RequestStatus } from "./types";
import { revalidatePath } from "next/cache";

export async function getTourRequests(page = 1, pageSize = 10) {
    const result = await tourRequestDb.getAllTourRequests(page, pageSize);
    return {
        items: result.items,
        page: result.page,
        page_size: result.limit,
        total_pages: result.totalPages,
        total_items: result.total,
    };
}

export async function updateTourRequestStatus(id: string, status: RequestStatus) {
    try {
        const success = await tourRequestDb.updateTourRequestStatus(id, status);
        if (success) {
            revalidatePath("/admin/tour-requests");
            return { success: true };
        }
        return { success: false, error: "Failed to update status" };
    } catch (error) {
        return { success: false, error: "Internal server error" };
    }
}

export async function deleteTourRequest(id: string) {
    try {
        const success = await tourRequestDb.deleteTourRequest(id);
        if (success) {
            revalidatePath("/admin/tour-requests");
            return { success: true };
        }
        return { success: false, error: "Failed to delete request" };
    } catch (error) {
        return { success: false, error: "Internal server error" };
    }
}

export async function getTourRequestById(id: string) {
    try {
        const data = await tourRequestDb.getTourRequestById(id);
        return data;
    } catch (error) {
        console.error("Error fetching tour request by id:", error);
        return null;
    }
}
