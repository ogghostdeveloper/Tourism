import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        // Validate filename to prevent directory traversal attacks
        if (!filename || filename.includes("..") || filename.includes("/")) {
            return new NextResponse("Invalid filename", { status: 400 });
        }

        // Construct the file path
        const filePath = join(process.cwd(), "uploads", filename);

        // Check if file exists
        if (!existsSync(filePath)) {
            return new NextResponse("File not found", { status: 404 });
        }

        // Read the file
        const fileBuffer = await readFile(filePath);

        // Determine content type based on file extension
        const extension = filename.split(".").pop()?.toLowerCase();
        const contentTypeMap: Record<string, string> = {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            gif: "image/gif",
            webp: "image/webp",
            svg: "image/svg+xml",
            bmp: "image/bmp",
            ico: "image/x-icon",
        };

        const contentType = contentTypeMap[extension || ""] || "application/octet-stream";

        // Return the file with appropriate headers
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving uploaded file:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
