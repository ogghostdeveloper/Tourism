"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "@/components/ui/multi-select";
import type { MultiSelectOption } from "@/components/ui/multi-select";
import { toast } from "sonner";
import { Loader2, Upload, Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { tourSchema, Tour } from "../schema";
import { getCategoriesForDropdown } from "../actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TourFormProps {
    initialData?: Tour;
    action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
    title: string;
}

export function TourForm({ initialData, action, title: pageTitle }: TourFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(initialData?.image || null);
    const [dragActive, setDragActive] = React.useState(false);
    const [categoryOptions, setCategoryOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = React.useState(true);
    const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(tourSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            description: "",
            image: "",
            duration: "",
            price: "",
            featured: false,
            category: "",
            highlights: [],
            days: [],
        },
    });

    const { fields: dayFields, append: appendDay, remove: removeDay, move: moveDay } = useFieldArray({
        control,
        name: "days",
    });

    const category = watch("category");

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategoriesForDropdown();
                setCategoryOptions(categories);
            } catch (error) {
                toast.error("Failed to fetch categories");
            } finally {
                setIsLoadingCategories(false);
            }
        };
        fetchCategories();
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data: Tour) => {
        const formData = new FormData();

        // Append all standard fields
        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("category", data.category || "");
        formData.append("description", data.description);
        formData.append("duration", data.duration);
        formData.append("price", data.price);
        formData.append("featured", String(data.featured));
        formData.append("highlights", JSON.stringify(data.highlights || []));
        formData.append("days", JSON.stringify(data.days));
        formData.append("image", data.image);

        if (selectedFile) {
            formData.append("imageFile", selectedFile);
        }

        startTransition(async () => {
            try {
                const result = await action(formData);
                if (result.success) {
                    toast.success(result.message);
                    router.push("/admin/tours");
                    router.refresh();
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("An error occurred while saving tour");
            }
        });
    };

    return (
        <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <Link href="/admin/tours" className="mb-4">
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
                <h2 className="text-2xl font-semibold tracking-tight text-black italic serif">
                    {pageTitle}
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-black">Title *</Label>
                        <Input
                            {...register("title")}
                            placeholder="Spiritual Discovery: Nepal & Bhutan"
                            className="bg-white border-gray-200 text-black"
                        />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black">Slug *</Label>
                        <Input
                            {...register("slug")}
                            placeholder="spiritual-discovery-nepal-bhutan"
                            className="bg-white border-gray-200 text-black"
                            readOnly={!!initialData?._id}
                        />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black">Category</Label>
                        <Select
                            value={category}
                            onValueChange={(val) => setValue("category", val)}
                        >
                            <SelectTrigger className="bg-white border-gray-200 text-black">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoryOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                                {categoryOptions.length === 0 && !isLoadingCategories && (
                                    <SelectItem value="untagged" disabled>No categories found</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black">Duration</Label>
                        <Input
                            {...register("duration")}
                            placeholder="14 Days / 13 Nights"
                            className="bg-white border-gray-200 text-black"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black">Price</Label>
                        <Input
                            {...register("price")}
                            placeholder="From $8,500 per person"
                            className="bg-white border-gray-200 text-black"
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-8">
                        <Checkbox
                            id="featured"
                            checked={watch("featured")}
                            onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                        />
                        <Label htmlFor="featured" className="text-sm font-medium leading-none cursor-pointer text-black">
                            Show as Featured Tour
                        </Label>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-black">Description *</Label>
                    <Textarea
                        {...register("description")}
                        placeholder="Describe the tour..."
                        className="min-h-[150px] bg-white border-gray-200 text-black resize-none"
                    />
                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
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
                            name="imageFile"
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {/* Hidden input for existing image URL if no new file is selected */}
                        <input type="hidden" {...register("image")} />
                    </div>
                </div>

                <div className="space-y-4 border-t border-gray-100 pt-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-black italic serif">Itinerary Days</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-black border-gray-200"
                            onClick={() => appendDay({ day: dayFields.length + 1, title: "", description: "", activities: [], highlights: [], experiences: [] })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Day
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {dayFields.map((field, index) => (
                            <div key={field.id} className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50/30 relative group shadow-sm">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <GripVertical className="text-gray-300 cursor-move" />
                                        <div className="flex flex-col">
                                            <span className="font-mono text-[10px] font-bold text-amber-600 tracking-wider">DAY {index + 1}</span>
                                            <Input
                                                {...register(`days.${index}.title`)}
                                                placeholder="Arrival in Kathmandu"
                                                className="h-8 py-0 px-0 text-base font-semibold border-none bg-transparent focus-visible:ring-0 max-w-[400px] text-black"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button type="button" variant="ghost" size="icon" onClick={() => index > 0 && moveDay(index, index - 1)} disabled={index === 0}>
                                            <ChevronUp className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => index < dayFields.length - 1 && moveDay(index, index + 1)} disabled={index === dayFields.length - 1}>
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                        <Button type="button" variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeDay(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Activity Description</Label>
                                        <Textarea
                                            {...register(`days.${index}.description`)}
                                            placeholder="Describe the day's events..."
                                            className="text-sm min-h-[100px] bg-white/50 border-gray-200 text-black resize-none focus:bg-white transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Day Image URL</Label>
                                            <Input {...register(`days.${index}.image`)} placeholder="https://..." className="h-9 text-sm bg-white/50 border-gray-200 text-black focus:bg-white transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Accommodation</Label>
                                            <Input {...register(`days.${index}.accommodation`)} placeholder="Dwarika's Hotel" className="h-9 text-sm bg-white/50 border-gray-200 text-black focus:bg-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {dayFields.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/20">
                                <p className="text-gray-400 text-sm">No itinerary days added yet.</p>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="text-amber-600 font-semibold"
                                    onClick={() => appendDay({ day: 1, title: "", description: "", activities: [], highlights: [], experiences: [] })}
                                >
                                    Add your first day
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-gray-100 pt-8">
                    <Button variant="outline" type="button" asChild className="text-black border-gray-200">
                        <Link href="/admin/tours">Cancel</Link>
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
                                {initialData ? "Update Tour" : "Create Tour"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
