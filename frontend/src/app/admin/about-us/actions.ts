"use server";

import { revalidatePath } from "next/cache";
import { aboutSectionsData } from "@/app/(website)/about-us/data/about-data";

export async function getAboutContent() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return aboutSectionsData;
  } catch (error) {
    console.error("Error fetching about content:", error);
    return aboutSectionsData;
  }
}

export async function updateAboutContent(data: typeof aboutSectionsData) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would update in database
    console.log("Updating about content:", data);

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
