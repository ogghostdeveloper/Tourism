"use server";

import * as tourDb from "@/lib/data/tours";
import { Tour, TourDay } from "./schema";

export async function getAllTours(): Promise<Tour[]> {
  try {
    const all = await tourDb.getAllTours();
    return all as Tour[];
  } catch (error) {
    console.error("Error fetching all tours:", error);
    throw new Error("Failed to fetch tours");
  }
}

export async function getFeaturedTours(): Promise<Tour[]> {
  try {
    const all = await tourDb.getAllTours();
    return all.filter((tour: any) => tour.featured) as Tour[];
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    throw new Error("Failed to fetch featured tours");
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  try {
    const tour = await tourDb.getTourBySlug(slug);
    return tour as Tour | null;
  } catch (error) {
    console.error(`Error fetching tour with slug ${slug}:`, error);
    throw new Error("Failed to fetch tour");
  }
}

export async function getTourDay(
  slug: string,
  dayNumber: number
): Promise<{ dayData: TourDay; tour: Tour } | null> {
  try {
    const tour = await tourDb.getTourBySlug(slug);
    if (!tour) return null;

    const dayData = tour.days.find((d: any) => d.day === dayNumber);
    if (!dayData) return null;

    return { dayData, tour: tour as Tour };
  } catch (error) {
    console.error(`Error fetching day ${dayNumber} for tour ${slug}:`, error);
    throw new Error("Failed to fetch tour day");
  }
}

export async function getRelatedTours(currentSlug: string): Promise<Tour[]> {
  try {
    const all = await tourDb.getAllTours();
    return all.filter((tour: any) => tour.slug !== currentSlug).slice(0, 3) as Tour[];
  } catch (error) {
    console.error("Error fetching related tours:", error);
    throw new Error("Failed to fetch related tours");
  }
}

export async function getToursByCategory(category: string): Promise<Tour[]> {
  try {
    const all = await tourDb.getAllTours();
    return all.filter((tour: any) => tour.category === category) as Tour[];
  } catch (error) {
    console.error(`Error fetching tours by category ${category}:`, error);
    throw new Error("Failed to fetch tours by category");
  }
}

export async function getFeaturedTour(): Promise<Tour> {
  try {
    const all = await tourDb.getAllTours();
    const featured = all.find((tour: any) => tour.featured);
    return (featured || all[0]) as Tour;
  } catch (error) {
    console.error("Error fetching featured tour:", error);
    throw new Error("Failed to fetch featured tour");
  }
}
