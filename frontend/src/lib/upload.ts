
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";
import sharp from "sharp";

const DEFAULT_IMGBB_KEY = process.env.IMGBB_API_KEY || "3bd55fda02be78dd8da48f281f6c3b69";

async function uploadToImgBB(buffer: Buffer, name?: string): Promise<string | null> {
    try {
        const apiKey = DEFAULT_IMGBB_KEY;
        if (!apiKey) {
            console.warn("ImgBB API key not configured");
            return null;
        }

        const base64 = buffer.toString("base64");

        const params = new URLSearchParams();
        params.append("key", apiKey);
        params.append("image", base64);
        if (name) params.append("name", name);

        const res = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: params,
        });

        if (!res.ok) {
            console.error("ImgBB upload failed, status:", res.status);
            return null;
        }

        const json = await res.json();
        if (json && json.success && json.data) {
            // return the direct image URL
            return json.data.url || json.data.display_url || json.data.image?.url || null;
        }

        console.error("Unexpected ImgBB response:", json);
        return null;
    } catch (err) {
        console.error("Error uploading to ImgBB:", err);
        return null;
    }
}

export async function uploadImage(file: File, options: { useImgBB?: boolean } = { useImgBB: true }): Promise<string | null> {
    if (!file || !(file instanceof File) || file.size === 0) {
        return null;
    }

    try {
        const bytes = await file.arrayBuffer();
        let buffer = Buffer.from(bytes as ArrayBuffer);

        // Compress the image using sharp
        try {
            buffer = await sharp(buffer)
                .rotate()
                .withMetadata()
                .webp({ quality: 80, effort: 6 })
                .toBuffer() as any;
        } catch (error) {
            console.warn("Image compression failed, using original:", error);
        }

        // If requested, upload to ImgBB and return remote URL
        if (options?.useImgBB) {
            const name = `${uuidv4()}`;
            const remoteUrl = await uploadToImgBB(buffer, name);
            if (remoteUrl) return remoteUrl;
            // if remote upload failed, fall back to local save
            console.warn("Falling back to local save after ImgBB failure");
        }

        // Create a unique filename with .webp extension
        const filename = `${uuidv4()}.webp`;

        // Define the path to save the file
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

export async function deleteImage(filenameOrUrl: string): Promise<boolean> {
    try {
        // If it's a remote URL, we don't have the delete token stored.
        // Informationally return false — caller can handle remote deletion separately.
        if (filenameOrUrl.startsWith("http://") || filenameOrUrl.startsWith("https://")) {
            console.warn(`Remote deletion not supported for URL: ${filenameOrUrl}`);
            return false;
        }

        const uploadsDir = join(process.cwd(), "uploads");
        const path = join(uploadsDir, filenameOrUrl);

        // Check if file exists
        if (!existsSync(path)) {
            console.warn(`File not found: ${filenameOrUrl}`);
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
    newFile: File,
    options: { useImgBB?: boolean } = { useImgBB: true }
): Promise<string | null> {
    try {
        // Attempt to delete old image (local only)
        const deleteSuccess = await deleteImage(oldFilename);
        if (!deleteSuccess && !(oldFilename.startsWith("http://") || oldFilename.startsWith("https://"))) {
            console.warn(`Failed to delete old image: ${oldFilename}`);
        }

        // Upload new image with chosen option
        const newFilename = await uploadImage(newFile, options);
        return newFilename;
    } catch (error) {
        console.error("Error updating image:", error);
        return null;
    }
}

