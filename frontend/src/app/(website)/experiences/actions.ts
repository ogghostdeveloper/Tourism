"use server";

import { ActionResponse } from "./schema";
import * as db from "@/lib/data/experiences";
import { Experience } from "@/app/admin/experiences/schema";

export async function getExperiences(): Promise<Experience[]> {
  try {
    const data = await db.listExperiences(1, 100);
    return data.items as Experience[];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  try {
    const experience = await db.getExperienceBySlug(slug);
    return experience as Experience | null;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return null;
  }
}

export async function getExperiencesByCategory(category: string): Promise<Experience[]> {
  try {
    const data = await db.listExperiences(1, 100);
    if (category === "All") return data.items as Experience[];
    return (data.items as Experience[]).filter((e) => e.category === category);
  } catch (error) {
    console.error("Error fetching experiences by category:", error);
    return [];
  }
}

export async function getFeaturedExperiences(limit: number = 3): Promise<Experience[]> {
  try {
    const data = await db.listExperiences(1, limit);
    return data.items as Experience[];
  } catch (error) {
    console.error("Error fetching featured experiences:", error);
    return [];
  }
}

export async function getAllExperiences(): Promise<Experience[]> {
  try {
    const data = await db.listExperiences(1, 1000);
    return data.items as Experience[];
  } catch (error) {
    console.error("Error fetching all experiences:", error);
    return [];
  }
}
