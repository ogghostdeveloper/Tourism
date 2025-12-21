"use server";

import { experiences } from "./data/experiences-data";
import { Experience } from "./schema";

export async function getExperiences(): Promise<Experience[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const experience = experiences.find((e) => e.slug === slug);
    return experience || null;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return null;
  }
}

export async function getExperiencesByCategory(category: string): Promise<Experience[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return experiences.filter((e) => e.category === category);
  } catch (error) {
    console.error("Error fetching experiences by category:", error);
    return [];
  }
}

export async function getFeaturedExperiences(limit: number = 3): Promise<Experience[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return experiences.slice(0, limit);
  } catch (error) {
    console.error("Error fetching featured experiences:", error);
    return [];
  }
}

export async function getAllExperiences(): Promise<Experience[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return experiences;
  } catch (error) {
    console.error("Error fetching all experiences:", error);
    return [];
  }
}
