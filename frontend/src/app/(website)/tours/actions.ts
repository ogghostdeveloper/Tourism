"use server";

import { tours } from "./data/tours-data";
import { Tour, TourDay } from "./schema";

export async function getAllTours(): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return tours;
  } catch (error) {
    console.error("Error fetching all tours:", error);
    throw new Error("Failed to fetch tours");
  }
}

export async function getFeaturedTours(): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return tours.filter((tour) => tour.featured);
  } catch (error) {
    console.error("Error fetching featured tours:", error);
    throw new Error("Failed to fetch featured tours");
  }
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    const tour = tours.find((tour) => tour.slug === slug);
    return tour || null;
  } catch (error) {
    console.error(`Error fetching tour with slug ${slug}:`, error);
    throw new Error("Failed to fetch tour");
  }
}

export async function getTourDay(
  slug: string,
  dayNumber: number
): Promise<{ dayData: TourDay; tour: Tour } | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    const tour = tours.find((t) => t.slug === slug);
    if (!tour) return null;

    const dayData = tour.days.find((d) => d.day === dayNumber);
    if (!dayData) return null;

    return { dayData, tour };
  } catch (error) {
    console.error(`Error fetching day ${dayNumber} for tour ${slug}:`, error);
    throw new Error("Failed to fetch tour day");
  }
}

export async function getRelatedTours(currentSlug: string): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return tours.filter((tour) => tour.slug !== currentSlug).slice(0, 3);
  } catch (error) {
    console.error("Error fetching related tours:", error);
    throw new Error("Failed to fetch related tours");
  }
}

export async function getToursByCategory(category: string): Promise<Tour[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return tours.filter((tour) => tour.category === category);
  } catch (error) {
    console.error(`Error fetching tours by category ${category}:`, error);
    throw new Error("Failed to fetch tours by category");
  }
}

export async function getFeaturedTour(): Promise<Tour> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    const featured = tours.find((tour) => tour.featured);
    return featured || tours[0];
  } catch (error) {
    console.error("Error fetching featured tour:", error);
    throw new Error("Failed to fetch featured tour");
  }
}
