"use client";

import * as React from "react";
import { Upload, X, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface GalleryUploadProps {
    label?: string;
    initialImages?: string[];
    onImagesChange?: (files: File[], remainingExisting: string[]) => void;
    readOnly?: boolean;
    className?: string;
}

export function GalleryUpload({
    label = "Gallery Images",
    initialImages = [],
    onImagesChange,
    readOnly = false,
    className,
}: GalleryUploadProps) {
    const [previews, setPreviews] = React.useState<string[]>(initialImages);
    const [files, setFiles] = React.useState<File[]>([]);
    const [existingImages, setExistingImages] = React.useState<string[]>(initialImages);
    const [dragActive, setDragActive] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        setPreviews([...existingImages, ...files.map(f => URL.createObjectURL(f))]);
    }, [existingImages, files]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
            handleFiles(newFiles);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
            handleFiles(newFiles);
        }
    };

    const handleFiles = (newFiles: File[]) => {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        if (onImagesChange) {
            onImagesChange(updatedFiles, existingImages);
        }
    };

    const removeImage = (index: number) => {
        if (index < existingImages.length) {
            const updatedExisting = existingImages.filter((_, i) => i !== index);
            setExistingImages(updatedExisting);
            if (onImagesChange) onImagesChange(files, updatedExisting);
        } else {
            const fileIndex = index - existingImages.length;
            const updatedFiles = files.filter((_, i) => i !== fileIndex);
            setFiles(updatedFiles);
            if (onImagesChange) onImagesChange(updatedFiles, existingImages);
        }
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <Label className="text-black font-semibold">{label}</Label>
            <div
                className={`border-2 border-dashed rounded-lg p-4 bg-white transition-colors ${dragActive ? "border-amber-600 bg-amber-50/50" : "border-gray-200"
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {previews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                        {previews.map((preview, index) => (
                            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                                <img
                                    src={preview}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {!readOnly && (
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-500/90 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        {!readOnly && (
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-amber-600 hover:text-amber-600 transition-colors"
                            >
                                <Plus className="w-6 h-6" />
                                <span className="text-xs font-medium">Add Image</span>
                            </button>
                        )}
                    </div>
                )}

                {previews.length === 0 && (
                    <div
                        className="flex flex-col items-center justify-center py-8 cursor-pointer"
                        onClick={() => !readOnly && fileInputRef.current?.click()}
                    >
                        <div className="bg-gray-50 p-3 rounded-full mb-3">
                            <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-black">
                            {readOnly ? "No gallery images" : "Click to upload or drag and drop images"}
                        </p>
                        {!readOnly && (
                            <p className="text-xs text-gray-500 mt-1">
                                Multiple photos allowed
                            </p>
                        )}
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*"
                    multiple
                    disabled={readOnly}
                />
            </div>
        </div>
    );
}
