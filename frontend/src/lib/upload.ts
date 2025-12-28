import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";
import sharp from "sharp";

export async function uploadImage(file: File): Promise<string | null> {
    if (!file || !(file instanceof File) || file.size === 0) {
        return null;
    }

    try {
        const bytes = await file.arrayBuffer();
        let buffer = Buffer.from(bytes as ArrayBuffer);

        // Compress the image using sharp
        // Detect the image format and apply appropriate compression
        try {
            buffer = await sharp(buffer)
                .rotate() // Auto-rotate based on EXIF data if available
                .withMetadata() // Remove EXIF data
                .webp({ quality: 80, effort: 6 }) // Convert to WebP with 80% quality
                .toBuffer() as any;

        } catch (error) {
            console.warn("Image compression failed, using original:", error);
            // If compression fails, continue with original buffer
        }

        // Create a unique filename with .webp extension
        const filename = `${uuidv4()}.webp`;

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

export async function deleteImage(filename: string): Promise<boolean> {
    try {
        const uploadsDir = join(process.cwd(), "uploads");
        const path = join(uploadsDir, filename);

        // Check if file exists
        if (!existsSync(path)) {
            console.warn(`File not found: ${filename}`);
            return false;
        }

        // Delete the file
        await unlink(path);
        return true;
    } catch (error) {
        console.error("Error deleting image:", error);
        return false;
    }
}

export async function updateImage(
    oldFilename: string,
    newFile: File
): Promise<string | null> {
    try {
        // Delete old image
        const deleteSuccess = await deleteImage(oldFilename);
        if (!deleteSuccess) {
            console.warn(`Failed to delete old image: ${oldFilename}`);
        }

        // Upload new image
        const newFilename = await uploadImage(newFile);
        return newFilename;
    } catch (error) {
        console.error("Error updating image:", error);
        return null;
    }
}

