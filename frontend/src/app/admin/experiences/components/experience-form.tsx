"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import type { MultiSelectOption } from "@/components/ui/multi-select";
import { toast } from "sonner";
import { Loader2, Upload, X, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { getAllDestinations } from "@/app/admin/destinations/actions";
import { getExperienceTypes } from "@/app/admin/experience-types/actions";
import { DatePicker } from "@/components/ui/date-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { parseISO, format } from "date-fns";

interface ExperienceFormProps {
    initialData?: any;
    action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
    id?: string | null;
    title: string;
}

export function ExperienceForm({ initialData, action, id = null, title: pageTitle }: ExperienceFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(initialData?.image || null);
    const [dragActive, setDragActive] = React.useState(false);
    const [selectedDestinations, setSelectedDestinations] = React.useState<string[]>(initialData?.destinations || (initialData?.destinationSlug ? [initialData.destinationSlug] : []));
    const [destinationOptions, setDestinationOptions] = React.useState<MultiSelectOption[]>([]);
    const [categoryOptions, setCategoryOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [galleryFiles, setGalleryFiles] = React.useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = React.useState<string[]>(initialData?.gallery || []);
    const [existingGallery, setExistingGallery] = React.useState<string[]>(initialData?.gallery || []);

    const [startDate, setStartDate] = React.useState<Date | undefined>(initialData?.startDate ? parseISO(initialData.startDate) : undefined);
    const [endDate, setEndDate] = React.useState<Date | undefined>(initialData?.endDate ? parseISO(initialData.endDate) : undefined);
    const [category, setCategory] = React.useState<string>(initialData?.category || "");

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const galleryInputRef = React.useRef<HTMLInputElement>(null);
    const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

    const isFestivalOrCulture = category?.toLowerCase() === "festival" || category?.toLowerCase() === "culture" || category?.toLowerCase() === "festivals";

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [destinations, expTypes] = await Promise.all([
                    getAllDestinations(),
                    getExperienceTypes(1, 100),
                ]);

                setDestinationOptions(
                    destinations.map((dest) => ({
                        value: dest.slug,
                        label: dest.name,
                    }))
                );

                setCategoryOptions(
                    expTypes.items.map((type) => ({
                        value: type.title,
                        label: type.title,
                    }))
                );
            } catch (error) {
                toast.error("Failed to fetch form dependencies");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith("image/")) {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
                if (fileInputRef.current) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    fileInputRef.current.files = dataTransfer.files;
                }
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith("image/")) {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
            }
        }
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).filter(file => file.type.startsWith("image/"));
            setGalleryFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setGalleryPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeGalleryImage = (index: number) => {
        if (index < existingGallery.length) {
            setExistingGallery(prev => prev.filter((_, i) => i !== index));
        } else {
            const fileIndex = index - existingGallery.length;
            setGalleryFiles(prev => prev.filter((_, i) => i !== fileIndex));
        }
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.set("destinations", JSON.stringify(selectedDestinations));
        formData.set("category", category);

        const durationVal = formData.get("duration");
        if (durationVal) {
            formData.set("duration", `${durationVal} Hours`);
        }

        if (isFestivalOrCulture) {
            if (startDate) formData.set("startDate", format(startDate, "yyyy-MM-dd"));
            if (endDate) formData.set("endDate", format(endDate, "yyyy-MM-dd"));
        } else {
            formData.delete("startDate");
            formData.delete("endDate");
        }

        if (id) {
            formData.set("existingGallery", JSON.stringify(existingGallery));
        }

        galleryFiles.forEach((file) => {
            formData.append(`gallery`, file);
        });

        startTransition(async () => {
            try {
                const result = await action(formData);
                if (result.success) {
                    toast.success(result.message);
                    router.push("/admin/experiences");
                    router.refresh();
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("An error occurred while saving experience");
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <Link href="/admin/experiences" className="mb-4">
                    <Button
                        variant="outline"
                        onMouseEnter={() => iconRef.current?.startAnimation()}
                        onMouseLeave={() => iconRef.current?.stopAnimation()}
                        className="text-black"
                    >
                        <AnimatedArrowLeft ref={iconRef} className="h-4 w-4" />
                        Back
                    </Button>
                </Link>
                <h2 className="text-2xl font-semibold tracking-tight text-black">
                    {pageTitle}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-black">Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            required
                            placeholder="Enter experience title"
                            defaultValue={initialData?.title}
                            className="text-black bg-white border-gray-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug" className="text-black">Slug *</Label>
                        <Input
                            id="slug"
                            name="slug"
                            required
                            placeholder="experience-slug"
                            defaultValue={initialData?.slug}
                            className="text-black bg-white border-gray-200"
                            readOnly={!!id}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-black">Category *</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="bg-white border-gray-200 text-black">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration" className="text-black">Duration (Hours)</Label>
                        <Input
                            id="duration"
                            name="duration"
                            type="number"
                            step="0.5"
                            min="0.5"
                            placeholder="e.g., 2.5"
                            defaultValue={initialData?.duration ? parseFloat(initialData.duration) : undefined}
                            className="text-black bg-white border-gray-200"
                        />
                    </div>
                </div>

                {isFestivalOrCulture && (
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-black">Start Date</Label>
                            <DatePicker date={startDate} setDate={setStartDate} placeholder="Select start date" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-black">End Date</Label>
                            <DatePicker date={endDate} setDate={setEndDate} placeholder="Select end date" />
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-black">Difficulty</Label>
                    <Select name="difficulty" defaultValue={initialData?.difficulty}>
                        <SelectTrigger className="bg-white border-gray-200 text-black">
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="Challenging">Challenging</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-black">Description *</Label>
                    <Textarea
                        id="description"
                        name="description"
                        required
                        placeholder="Describe the experience..."
                        className="min-h-[200px] resize-none text-black bg-white border-gray-200"
                        rows={8}
                        defaultValue={initialData?.description}
                    />
                </div>

                <div className="border p-4 space-y-4 rounded-lg bg-gray-50/50">
                    <h3 className="font-semibold text-black">Destinations</h3>
                    <div className="space-y-2">
                        <Label className="text-black">Select Destinations</Label>
                        <MultiSelect
                            options={destinationOptions}
                            selected={selectedDestinations}
                            onChange={setSelectedDestinations}
                            placeholder="Select destinations..."
                        />
                    </div>
                </div>

                <div className="border p-4 space-y-4 rounded-lg bg-gray-50/50">
                    <h3 className="font-semibold text-black">Coordinates</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="latitude" className="text-black">Latitude</Label>
                            <Input
                                id="latitude"
                                name="latitude"
                                type="number"
                                step="any"
                                placeholder="27.4728"
                                defaultValue={initialData?.coordinates?.[0]}
                                className="text-black bg-white border-gray-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="longitude" className="text-black">Longitude</Label>
                            <Input
                                id="longitude"
                                name="longitude"
                                type="number"
                                step="any"
                                placeholder="89.6393"
                                defaultValue={initialData?.coordinates?.[1]}
                                className="text-black bg-white border-gray-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-black">Cover Image *</Label>
                    <div
                        className={`relative flex flex-col items-center justify-center border-2 border-dashed transition-colors rounded-lg ${dragActive
                            ? "border-black bg-black/5"
                            : "border-gray-200 bg-white"
                            } ${previewUrl ? "h-auto p-2" : "h-32"}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {previewUrl ? (
                            <div className="group relative aspect-video w-full overflow-hidden rounded-md">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <div className="bg-white px-4 py-2 text-sm font-medium text-gray-900 border border-black hover:bg-gray-100">
                                        Change Image
                                    </div>
                                </label>
                            </div>
                        ) : (
                            <label
                                htmlFor="image-upload"
                                className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
                            >
                                <Upload className="h-6 w-6 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-black">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, JPEG up to 5MB
                                    </p>
                                </div>
                            </label>
                        )}
                        <input
                            ref={fileInputRef}
                            id="image-upload"
                            name="image"
                            type="file"
                            className="hidden"
                            onChange={handleChange}
                            accept="image/*"
                            required={!previewUrl}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-black">Gallery Images</Label>
                    <div className="border-2 border-dashed border-gray-200 p-4 rounded-lg bg-white">
                        <input
                            ref={galleryInputRef}
                            id="gallery-upload"
                            type="file"
                            className="hidden"
                            onChange={handleGalleryChange}
                            accept="image/*"
                            multiple
                        />

                        {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {galleryPreviews.map((preview, index) => (
                                    <div key={index} className="relative group aspect-square rounded overflow-hidden">
                                        <img
                                            src={preview}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => galleryInputRef.current?.click()}
                            className="w-full bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            {galleryPreviews.length > 0 ? 'Add More Images' : 'Upload Gallery Images'}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline" type="button" asChild className="text-black">
                        <Link href="/admin/experiences">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isPending} className="bg-black text-white hover:bg-black/90 min-w-[150px]">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                {id ? "Update Experience" : "Create Experience"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
