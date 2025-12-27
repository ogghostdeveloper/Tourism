"use server";

import * as tourDb from "@/lib/data/tours";
import { Tour, PaginatedTours } from "./schema";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/upload";
import { auth } from "@/auth";

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
            // total_items: 0, // Removed as per instruction's example
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

export async function createTourAction(prevState: any, formData: FormData) {
    const session = await auth();
    if (!session) return { success: false, message: "Unauthorized" };

    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const duration = formData.get("duration") as string;
        const price = formData.get("price") as string;
        const featured = formData.get("featured") === "true";
        const highlightsStr = formData.get("highlights") as string;
        const highlights = JSON.parse(highlightsStr || "[]");
        const daysStr = formData.get("days") as string;
        const days = JSON.parse(daysStr || "[]");

        let imageUrl = formData.get("image") as string;
        const imageFile = formData.get("imageFile") as File;

        if (imageFile && imageFile.size > 0) {
            const uploadedPath = await uploadImage(imageFile);
            if (uploadedPath) imageUrl = uploadedPath;
        }

        const tourData: Partial<Tour> = {
            title,
            slug,
            category,
            description,
            duration,
            price,
            featured,
            highlights,
            days,
            image: imageUrl,
        };

        const id = await tourDb.createTour(tourData);
        revalidatePath("/admin/tours");
        revalidatePath("/tours");
        return { success: true, message: "Tour created successfully", id };
    } catch (error) {
        console.error("Error creating tour:", error);
        return { success: false, message: "Failed to create tour" };
    }
}

export async function updateTourAction(id: string, prevState: any, formData: FormData) {
    const session = await auth();
    if (!session) return { success: false, message: "Unauthorized" };

    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const duration = formData.get("duration") as string;
        const price = formData.get("price") as string;
        const featured = formData.get("featured") === "true";
        const highlightsStr = formData.get("highlights") as string;
        const highlights = JSON.parse(highlightsStr || "[]");
        const daysStr = formData.get("days") as string;
        const days = JSON.parse(daysStr || "[]");

        let imageUrl = formData.get("image") as string;
        const imageFile = formData.get("imageFile") as File;

        if (imageFile && imageFile.size > 0) {
            const uploadedPath = await uploadImage(imageFile);
            if (uploadedPath) imageUrl = uploadedPath;
        }

        const tourData: Partial<Tour> = {
            title,
            slug,
            category,
            description,
            duration,
            price,
            featured,
            highlights,
            days,
            image: imageUrl,
        };

        await tourDb.updateTour(id, tourData);
        revalidatePath("/admin/tours");
        revalidatePath(`/admin/tours/${id}`);
        revalidatePath("/tours");
        revalidatePath(`/tours/${slug}`);
        return { success: true, message: "Tour updated successfully" };
    } catch (error) {
        console.error("Error updating tour:", error);
        return { success: false, message: "Failed to update tour" };
    }
}

export async function deleteTourAction(id: string) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    try {
        await tourDb.deleteTour(id);
        revalidatePath("/admin/tours");
        revalidatePath("/tours");
        return { success: true, message: "Tour deleted successfully" };
    } catch (error) {
        console.error("Error deleting tour:", error);
        return { success: false, message: "Failed to delete tour" };
    }
}

export async function getCategoriesForDropdown(): Promise<{ value: string; label: string }[]> {
    try {
        const categories = await tourDb.listCategories(); // Assuming tourDb has a listCategories function
        return categories.map((cat: any) => ({
            value: cat.id, // Or cat.slug, depending on what's used as value
            label: cat.name,
        }));
    } catch (error) {
        console.error("Error fetching categories for dropdown:", error);
        return [];
    }
}
