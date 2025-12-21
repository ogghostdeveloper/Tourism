"use server";

import { revalidatePath } from "next/cache";
import { PaginatedDestinations, Destination } from "./schema";
import { destinationsData } from "./data/destinations-data";

export async function getDestinations(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedDestinations> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const totalItems = destinationsData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const items = destinationsData.slice(startIndex, endIndex);

    return {
      items,
      page,
      page_size: pageSize,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1,
    };
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return {
      items: [],
      page: 1,
      page_size: pageSize,
      total_pages: 0,
      has_next: false,
      has_prev: false,
    };
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const destination = destinationsData.find((d) => d.slug === slug);
    return destination || null;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

export async function createDestination(prevState: any, formData: FormData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const region = formData.get("region") as string;
    const description = formData.get("description") as string;
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const experiences = JSON.parse(formData.get("experiences") as string || "[]");
    const hotels = JSON.parse(formData.get("hotels") as string || "[]");

    // In a real app, this would save to database
    console.log("Creating destination:", {
      name,
      slug,
      region,
      description,
      coordinates: [latitude, longitude],
      experiences,
      hotels,
    });

    revalidatePath("/admin/destinations");

    return {
      success: true,
      message: "Destination created successfully",
    };
  } catch (error) {
    console.error("Error creating destination:", error);
    return {
      success: false,
      message: "Failed to create destination",
    };
  }
}

export async function updateDestination(
  slug: string,
  prevState: any,
  formData: FormData
) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const name = formData.get("name") as string;
    const region = formData.get("region") as string;
    const description = formData.get("description") as string;
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const experiences = JSON.parse(formData.get("experiences") as string || "[]");
    const hotels = JSON.parse(formData.get("hotels") as string || "[]");

    // In a real app, this would update in database
    console.log("Updating destination:", slug, {
      name,
      region,
      description,
      coordinates: [latitude, longitude],
      experiences,
      hotels,
    });

    revalidatePath("/admin/destinations");
    revalidatePath(`/admin/destinations/${slug}/edit`);

    return {
      success: true,
      message: "Destination updated successfully",
    };
  } catch (error) {
    console.error("Error updating destination:", error);
    return {
      success: false,
      message: "Failed to update destination",
    };
  }
}

export async function deleteDestination(slug: string) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // In a real app, this would delete from database
    console.log("Deleting destination:", slug);

    revalidatePath("/admin/destinations");

    return {
      success: true,
      message: "Destination deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting destination:", error);
    return {
      success: false,
      message: "Failed to delete destination",
    };
  }
}
