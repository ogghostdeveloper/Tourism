"use server";

import { revalidatePath } from "next/cache";
import { PaginatedHotels, Hotel } from "./schema";
import * as db from "@/lib/data/hotels";
import { auth } from "@/auth";
import { uploadImage } from "@/lib/upload";

export async function getHotels(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedHotels> {
  try {
    const data = await db.listHotels(page, pageSize);
    return data as PaginatedHotels;
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
    const hotel = await db.getHotelById(id);
    return hotel as Hotel | null;
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return null;
  }
}

export async function getAllHotels() {
  try {
    const hotels = await db.getAllHotels();
    return hotels;
  } catch (error) {
    console.error("Error fetching all hotels:", error);
    return [];
  }
}

export async function createHotel(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const destinationSlug = formData.get("destinationSlug") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const priceRange = formData.get("priceRange") as string;
    const roomsStr = formData.get("rooms") as string;
    const rooms = roomsStr ? parseInt(roomsStr) : undefined;

    const amenitiesStr = formData.get("amenities") as string;
    const amenities = amenitiesStr ? amenitiesStr.split("\n").filter(a => a.trim()) : [];

    const latStr = formData.get("latitude") as string;
    const lngStr = formData.get("longitude") as string;
    const latitude = latStr ? parseFloat(latStr) : undefined;
    const longitude = lngStr ? parseFloat(lngStr) : undefined;

    const imageInput = formData.get("image");
    let imageUrl = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb";

    if (imageInput instanceof File && imageInput.size > 0) {
      const uploadedPath = await uploadImage(imageInput);
      if (uploadedPath) {
        imageUrl = uploadedPath;
      }
    }

    const hotelData: any = {
      name,
      location,
      description,
      destinationSlug,
      rating,
      priceRange,
      rooms,
      amenities,
      image: imageUrl,
    };

    if (latitude !== undefined && longitude !== undefined && !isNaN(latitude) && !isNaN(longitude)) {
      hotelData.coordinates = [latitude, longitude];
    }

    await db.createHotel(hotelData);

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

export async function updateHotel(
  id: string,
  prevState: any,
  formData: FormData
) {
  const session = await auth();
  if (!session) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const destinationSlug = formData.get("destinationSlug") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const priceRange = formData.get("priceRange") as string;
    const roomsStr = formData.get("rooms") as string;
    const rooms = roomsStr ? parseInt(roomsStr) : undefined;

    const amenitiesStr = formData.get("amenities") as string;
    const amenities = amenitiesStr ? amenitiesStr.split("\n").filter(a => a.trim()) : [];

    const latStr = formData.get("latitude") as string;
    const lngStr = formData.get("longitude") as string;
    const latitude = latStr ? parseFloat(latStr) : undefined;
    const longitude = lngStr ? parseFloat(lngStr) : undefined;

    const imageInput = formData.get("image");
    const existingHotel = await db.getHotelById(id);
    let imageUrl = existingHotel?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb";

    if (imageInput instanceof File && imageInput.size > 0) {
      const uploadedPath = await uploadImage(imageInput);
      if (uploadedPath) {
        imageUrl = uploadedPath;
      }
    }

    const hotelData: any = {
      name,
      location,
      description,
      destinationSlug,
      rating,
      priceRange,
      rooms,
      amenities,
      image: imageUrl,
    };

    if (latitude !== undefined && longitude !== undefined && !isNaN(latitude) && !isNaN(longitude)) {
      hotelData.coordinates = [latitude, longitude];
    }

    await db.updateHotel(id, hotelData);

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
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    await db.deleteHotel(id);
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
