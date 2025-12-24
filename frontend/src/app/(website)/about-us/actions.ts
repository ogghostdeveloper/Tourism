"use server";

import { aboutSectionsData } from "./data/about-data";
import { 
  heroData, 
  ourStoryData, 
  missionItems, 
  ourPurposeData, 
  sustainabilityItems, 
  whyBhutanItems 
} from "./data/about-data";
import { 
  Hero, 
  AboutSection, 
  MissionItem, 
  WhyBhutanItem, 
  SustainabilityItem 
} from "./schema";

// Main action for fetching about content (matches admin structure)
export async function getAboutContent() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return aboutSectionsData;
  } catch (error) {
    console.error("Error fetching about content:", error);
    return aboutSectionsData;
  }
}

// Legacy actions for backwards compatibility
export async function getHeroData(): Promise<Hero> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return heroData;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    throw new Error("Failed to fetch hero data");
  }
}

export async function getOurStoryData(): Promise<AboutSection> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return ourStoryData;
  } catch (error) {
    console.error("Error fetching our story data:", error);
    throw new Error("Failed to fetch our story data");
  }
}

export async function getMissionItems(): Promise<MissionItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return missionItems.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching mission items:", error);
    throw new Error("Failed to fetch mission items");
  }
}

export async function getOurPurposeData(): Promise<AboutSection> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return ourPurposeData;
  } catch (error) {
    console.error("Error fetching our purpose data:", error);
    throw new Error("Failed to fetch our purpose data");
  }
}

export async function getSustainabilityItems(): Promise<SustainabilityItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return sustainabilityItems.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching sustainability items:", error);
    throw new Error("Failed to fetch sustainability items");
  }
}

export async function getWhyBhutanItems(): Promise<WhyBhutanItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return whyBhutanItems.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching why Bhutan items:", error);
    throw new Error("Failed to fetch why Bhutan items");
  }
}

export async function getAllAboutData() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  try {
    return {
      hero: heroData,
      ourStory: ourStoryData,
      mission: missionItems.sort((a, b) => a.order - b.order),
      ourPurpose: ourPurposeData,
      sustainability: sustainabilityItems.sort((a, b) => a.order - b.order),
      whyBhutan: whyBhutanItems.sort((a, b) => a.order - b.order),
    };
  } catch (error) {
    console.error("Error fetching all about data:", error);
    throw new Error("Failed to fetch all about data");
  }
}
