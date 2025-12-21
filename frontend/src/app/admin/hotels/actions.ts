"use server";

import { revalidatePath } from "next/cache";
import { PaginatedHotels, Hotel } from "./schema";
import { hotelsData } from "./data/hotels-data";

export async function getHotels(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedHotels> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const totalItems = hotelsData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const items = hotelsData.slice(startIndex, endIndex);

    return {
      items,
      page,
      page_size: pageSize,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_prev: page > 1,
    };
  } catch (error) {
    console.error("Error fetching hotels:", error);
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

export async function getHotelById(id: string): Promise<Hotel | null> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const hotel = hotelsData.find((h) => h.id === id);
    return hotel || null;
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return null;
  }
}

export async function createHotel(prevState: any, formData: FormData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const rating = parseInt(formData.get("rating") as string);
    const priceRange = formData.get("priceRange") as string;
    const rooms = parseInt(formData.get("rooms") as string);
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const amenities = JSON.parse(formData.get("amenities") as string || "[]");

    // In a real app, this would save to database
    console.log("Creating hotel:", {
      name,
      location,
      description,
      rating,
      priceRange,
      rooms,
      coordinates: [latitude, longitude],
      amenities,
    });

    revalidatePath("/admin/hotels");

    return {
      success: true,
      message: "Hotel created successfully",
    };
  } catch (error) {
    console.error("Error creating hotel:", error);
    return {
      success: false,
      message: "Failed to create hotel",
    };
  }
}

export async function updateHotel(id: string, prevState: any, formData: FormData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const rating = parseInt(formData.get("rating") as string);
    const priceRange = formData.get("priceRange") as string;
    const rooms = parseInt(formData.get("rooms") as string);
    const latitude = parseFloat(formData.get("latitude") as string);
    const longitude = parseFloat(formData.get("longitude") as string);
    const amenities = JSON.parse(formData.get("amenities") as string || "[]");

    // In a real app, this would update in database
    console.log("Updating hotel:", id, {
      name,
      location,
      description,
      rating,
      priceRange,
      rooms,
      coordinates: [latitude, longitude],
      amenities,
    });

    revalidatePath("/admin/hotels");
    revalidatePath(`/admin/hotels/${id}/edit`);

    return {
      success: true,
      message: "Hotel updated successfully",
    };
  } catch (error) {
    console.error("Error updating hotel:", error);
    return {
      success: false,
      message: "Failed to update hotel",
    };
  }
}

export async function deleteHotel(id: string) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // In a real app, this would delete from database
    console.log("Deleting hotel:", id);

    revalidatePath("/admin/hotels");

    return {
      success: true,
      message: "Hotel deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return {
      success: false,
      message: "Failed to delete hotel",
    };
  }
}
