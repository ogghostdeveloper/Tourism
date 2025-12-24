"use server";

import * as destDb from "@/lib/data/destinations";
import * as expDb from "@/lib/data/experiences";
import * as hotelDb from "@/lib/data/hotels";
import { Destination, Experience, Hotel } from "./schema";

export async function getDestinations(): Promise<Destination[]> {
  try {
    const data = await destDb.getAllDestinations();
    return data as Destination[];
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

export async function getDestinationBySlug(
  slug: string
): Promise<Destination | null> {
  try {
    const destination = await destDb.getDestinationBySlug(slug);
    return destination as Destination | null;
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

export async function getDestinationsByRegion(
  region: string
): Promise<Destination[]> {
  try {
    const all = await destDb.getAllDestinations();
    return all.filter((d) => d.region === region) as Destination[];
  } catch (error) {
    console.error("Error fetching destinations by region:", error);
    return [];
  }
}

export async function getFeaturedDestinations(
  limit: number = 4
): Promise<Destination[]> {
  try {
    const all = await destDb.getAllDestinations();
    return all.slice(0, limit) as Destination[];
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const data = await destDb.getAllDestinations();
    return data as Destination[];
  } catch (error) {
    console.error("Error fetching all destinations:", error);
    return [];
  }
}

export async function getExperiencesByDestination(
  slug: string
): Promise<Experience[]> {
  try {
    // We can either find experiences that have this destination in their 'destinations' array
    // OR find experiences that match the slugs in the destination's 'experiences' array.
    // Let's do both for robustness if the data is migating.
    const destination = await destDb.getDestinationBySlug(slug);
    const allExperiences = await expDb.getAllExperiences();

    if (!destination) return [];

    const linkedByDestination = allExperiences.filter(exp =>
      destination.experiences?.includes(exp.slug) ||
      exp.destinationSlug === slug ||
      exp.destinations?.includes(slug)
    );

    return linkedByDestination as Experience[];
  } catch (error) {
    console.error("Error fetching experiences by destination:", error);
    return [];
  }
}

export async function getHotelsByDestination(slug: string): Promise<Hotel[]> {
  try {
    const destination = await destDb.getDestinationBySlug(slug);
    const allHotels = await hotelDb.getAllHotels();

    if (!destination) return [];

    const linkedHotels = allHotels.filter(hotel =>
      destination.hotels?.includes(hotel.id) ||
      hotel.destinationSlug === slug
    );

    return linkedHotels as Hotel[];
  } catch (error) {
    console.error("Error fetching hotels by destination:", error);
    return [];
  }
}


