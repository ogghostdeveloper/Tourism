import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

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
        // Save to /uploads directory at project root (not in public)
        const uploadsDir = join(process.cwd(), "uploads");

        // Ensure uploads directory exists
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        const path = join(uploadsDir, filename);

        // Write the file
        await writeFile(path, buffer);

        // Return the API route URL that will serve this file
        return `/api/uploads/${filename}`;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
}
