"use server";

import { destinationsData } from "./data/destinations-data";
import { experiences } from "./data/experiences-data";
import { hotels } from "./data/hotels-data";
import { Destination, Experience, Hotel } from "./schema";

export async function getDestinations(): Promise<Destination[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return destinationsData;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
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

export async function getDestinationsByRegion(
  region: string
): Promise<Destination[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return destinationsData.filter((d) => d.region === region);
  } catch (error) {
    console.error("Error fetching destinations by region:", error);
    return [];
  }
}

export async function getFeaturedDestinations(
  limit: number = 4
): Promise<Destination[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Return first N destinations as featured
    return destinationsData.slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return destinationsData;
  } catch (error) {
    console.error("Error fetching all destinations:", error);
    return [];
  }
}

export async function getExperiencesByDestination(
  slug: string
): Promise<Experience[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return experiences.filter((e) => e.destinationSlug === slug);
  } catch (error) {
    console.error("Error fetching experiences by destination:", error);
    return [];
  }
}

export async function getHotelsByDestination(slug: string): Promise<Hotel[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return hotels.filter((h) => h.destinationSlug === slug);
  } catch (error) {
    console.error("Error fetching hotels by destination:", error);
    return [];
  }
}

