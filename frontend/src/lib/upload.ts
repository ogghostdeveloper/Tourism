import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(file: File): Promise<string | null> {
    if (!file || !(file instanceof File) || file.size === 0) {
        return null;
    }

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const extension = file.name.split(".").pop();
        const filename = `${uuidv4()}.${extension}`;

        // Define the path to save the file
        // In Next.js, public folder is the root for static assets
        const path = join(process.cwd(), "public", "uploads", filename);

        // Write the file
        await writeFile(path, buffer);

        // Return the relative URL
        return `/uploads/${filename}`;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}
