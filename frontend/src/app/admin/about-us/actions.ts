"use server";

import { revalidatePath } from "next/cache";
import { getAboutContent, updateAboutContent, AboutContent } from "@/lib/data/about";
import { uploadImage } from "@/lib/upload";

export async function getAboutContentAction() {
  try {
    const content = await getAboutContent();

    // Serialize the data to plain objects (convert ObjectId and Date to strings)
    return JSON.parse(JSON.stringify(content));
  } catch (error) {
    console.error("Error fetching about content:", error);
    throw new Error("Failed to fetch about content");
  }
}

export async function updateAboutContentAction(formData: FormData) {
  try {
    // Extract form fields
    const heroTitle = formData.get("hero-title") as string;
    const heroSubtitle = formData.get("hero-subtitle") as string;
    const heroContent = formData.get("hero-content") as string;

    const storyTitle = formData.get("story-title") as string;
    const storySubtitle = formData.get("story-subtitle") as string;
    const storyContent = formData.get("story-content") as string;

    const missionTitle = formData.get("mission-title") as string;
    const missionSubtitle = formData.get("mission-subtitle") as string;

    const purposeTitle = formData.get("purpose-title") as string;
    const purposeSubtitle = formData.get("purpose-subtitle") as string;
    const purposeContent = formData.get("purpose-content") as string;

    const sustainableTitle = formData.get("sustainable-title") as string;
    const sustainableSubtitle = formData.get("sustainable-subtitle") as string;
    const sustainableIntro = formData.get("sustainable-intro") as string;

    // Handle image uploads
    const heroImageFile = formData.get("heroImage");
    const storyImageFile = formData.get("storyImage");
    const purposeImageFile = formData.get("purposeImage");
    const sustainableImageFile = formData.get("sustainableImage");

    const existingHeroImage = formData.get("existingHeroImage") as string;
    const existingStoryImage = formData.get("existingStoryImage") as string;
    const existingPurposeImage = formData.get("existingPurposeImage") as string;
    const existingSustainableImage = formData.get("existingSustainableImage") as string;

    let heroImage = existingHeroImage;
    let storyImage = existingStoryImage;
    let purposeImage = existingPurposeImage;
    let sustainableImage = existingSustainableImage;

    // Upload new images if provided
    if (heroImageFile instanceof File && heroImageFile.size > 0) {
      const uploadedPath = await uploadImage(heroImageFile);
      if (uploadedPath) heroImage = uploadedPath;
    }

    if (storyImageFile instanceof File && storyImageFile.size > 0) {
      const uploadedPath = await uploadImage(storyImageFile);
      if (uploadedPath) storyImage = uploadedPath;
    }

    if (purposeImageFile instanceof File && purposeImageFile.size > 0) {
      const uploadedPath = await uploadImage(purposeImageFile);
      if (uploadedPath) purposeImage = uploadedPath;
    }

    if (sustainableImageFile instanceof File && sustainableImageFile.size > 0) {
      const uploadedPath = await uploadImage(sustainableImageFile);
      if (uploadedPath) sustainableImage = uploadedPath;
    }

    // Parse mission items
    const missionItemsStr = formData.get("missionItems") as string;
    const missionItems = missionItemsStr ? JSON.parse(missionItemsStr) : [];

    // Parse sustainable items
    const sustainableItemsStr = formData.get("sustainableItems") as string;
    const sustainableItems = sustainableItemsStr ? JSON.parse(sustainableItemsStr) : [];

    const data: AboutContent = {
      hero: {
        title: heroTitle,
        subtitle: heroSubtitle,
        content: heroContent,
        image: heroImage,
      },
      story: {
        title: storyTitle,
        subtitle: storySubtitle,
        content: storyContent,
        image: storyImage,
      },
      mission: {
        title: missionTitle,
        subtitle: missionSubtitle,
        image: "", // Mission doesn't have an image
        items: missionItems,
      },
      purpose: {
        title: purposeTitle,
        subtitle: purposeSubtitle,
        content: purposeContent,
        image: purposeImage,
      },
      sustainable: {
        title: sustainableTitle,
        subtitle: sustainableSubtitle,
        intro: sustainableIntro,
        image: sustainableImage,
        items: sustainableItems,
      },
    };

    await updateAboutContent(data);

    revalidatePath("/admin/about-us");
    revalidatePath("/about-us");

    return {
      success: true,
      message: "Content updated successfully",
    };
  } catch (error) {
    console.error("Error updating about content:", error);
    return {
      success: false,
      message: "Failed to update content",
    };
  }
}
