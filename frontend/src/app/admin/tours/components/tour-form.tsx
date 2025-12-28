"use client";

import * as React from "react";
import { useForm, useFieldArray, Control, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Upload, Plus, Trash2, ChevronDown, ChevronUp, GripVertical, Save, X, MapPin, Clock, ArrowRightLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { tourSchema, Tour, TourDay, ItineraryItem } from "../schema";
import { getCategoriesForDropdown, getDestinationsForDropdown, getExperiencesForDropdown, getHotelsForDropdown } from "../actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    const [dayFiles, setDayFiles] = React.useState<{ [key: number]: File }>({});
    const [dayPreviews, setDayPreviews] = React.useState<{ [key: number]: string }>(
        initialData?.days.reduce((acc, day, idx) => {
            if (day.image) acc[idx] = day.image;
            return acc;
        }, {} as { [key: number]: string }) || {}
    );
    const [dragActive, setDragActive] = React.useState(false);
    const [categoryOptions, setCategoryOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [experienceOptions, setExperienceOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [hotelOptions, setHotelOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [destinationOptions, setDestinationOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = React.useState(true);
    const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<Tour>({
        resolver: zodResolver(tourSchema) as any,
        defaultValues: initialData ? {
            ...initialData,
            featured: initialData.featured ?? false,
            category: initialData.category ?? "",
            highlights: initialData.highlights ?? [],
            days: initialData.days ?? [],
        } : {
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

    React.useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [categories, experiences, hotels, destinations] = await Promise.all([
                    getCategoriesForDropdown(),
                    getExperiencesForDropdown(),
                    getHotelsForDropdown(),
                    getDestinationsForDropdown()
                ]);
                setCategoryOptions(categories);
                setExperienceOptions(experiences);
                setHotelOptions(hotels);
                setDestinationOptions(destinations);
            } catch (error) {
                toast.error("Failed to fetch options");
            } finally {
                setIsLoadingOptions(false);
            }
        };
        fetchOptions();
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

    const handleDayImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setDayFiles(prev => ({ ...prev, [index]: file }));
            setDayPreviews(prev => ({ ...prev, [index]: URL.createObjectURL(file) }));
        }
    };

    const onSubmit = (data: Tour) => {
        const formData = new FormData();

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

        Object.entries(dayFiles).forEach(([index, file]) => {
            formData.append(`dayImage_${index}`, file);
        });

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
                        <Label className="text-black font-medium">Title *</Label>
                        <Input
                            {...register("title")}
                            placeholder="Spiritual Discovery: Nepal & Bhutan"
                            className="bg-white border-gray-200 text-black h-11"
                        />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Slug *</Label>
                        <Input
                            {...register("slug")}
                            placeholder="spiritual-discovery-nepal-bhutan"
                            className="bg-white border-gray-200 text-black h-11"
                            readOnly={!!initialData?._id}
                        />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Category</Label>
                        <Select
                            value={watch("category")}
                            onValueChange={(val) => setValue("category", val)}
                        >
                            <SelectTrigger className="bg-white border-gray-200 text-black h-11">
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
                        <Label className="text-black font-medium">Duration</Label>
                        <Input
                            {...register("duration")}
                            placeholder="14 Days / 13 Nights"
                            className="bg-white border-gray-200 text-black h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Price</Label>
                        <Input
                            {...register("price")}
                            placeholder="From $8,500 per person"
                            className="bg-white border-gray-200 text-black h-11"
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
                    <Label className="text-black font-medium">Description *</Label>
                    <Textarea
                        {...register("description")}
                        placeholder="Describe the tour..."
                        className="min-h-[120px] bg-white border-gray-200 text-black resize-none"
                    />
                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="text-black font-medium">Cover Image *</Label>
                    <div
                        className={cn(
                            "relative flex flex-col items-center justify-center border-2 border-dashed transition-colors rounded-lg",
                            dragActive ? "border-black bg-black/5" : "border-gray-200 bg-white",
                            previewUrl ? "h-auto p-2" : "h-32"
                        )}
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
                        <input type="hidden" {...register("image")} />
                    </div>
                </div>

                <div className="space-y-6 border-t border-gray-100 pt-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-black italic serif underline underline-offset-8 decoration-gray-200">Daily Itinerary</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-black border-gray-200 font-medium"
                            onClick={() => appendDay({
                                day: dayFields.length + 1,
                                title: "",
                                description: "",
                                items: [],
                                hotelId: ""
                            })}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Day
                        </Button>
                    </div>

                    <div className="space-y-10">
                        {dayFields.map((field, index) => (
                            <DaySection
                                key={field.id}
                                index={index}
                                field={field}
                                control={control}
                                register={register}
                                setValue={setValue}
                                watch={watch}
                                moveDay={moveDay}
                                removeDay={removeDay}
                                totalDays={dayFields.length}
                                experienceOptions={experienceOptions}
                                hotelOptions={hotelOptions}
                                destinationOptions={destinationOptions}
                                dayPreview={dayPreviews[index]}
                                onDayImageChange={handleDayImageChange}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-gray-100 pt-12">
                    <Button variant="outline" type="button" asChild className="text-black border-gray-200 px-8">
                        <Link href="/admin/tours">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isPending} className="bg-black text-white hover:bg-black/90 min-w-[200px] h-11">
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

function DaySection({
    index,
    field,
    control,
    register,
    setValue,
    watch,
    moveDay,
    removeDay,
    totalDays,
    experienceOptions,
    hotelOptions,
    destinationOptions,
    dayPreview,
    onDayImageChange
}: {
    index: number;
    field: any;
    control: Control<Tour>;
    register: UseFormRegister<Tour>;
    setValue: UseFormSetValue<Tour>;
    watch: UseFormWatch<Tour>;
    moveDay: (from: number, to: number) => void;
    removeDay: (index: number) => void;
    totalDays: number;
    experienceOptions: { value: string; label: string }[];
    hotelOptions: { value: string; label: string }[];
    destinationOptions: { value: string; label: string }[];
    dayPreview?: string;
    onDayImageChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { fields: itemFields, append: appendItem, remove: removeItem, move: moveItem } = useFieldArray({
        control,
        name: `days.${index}.items` as any,
    });

    return (
        <Card className="border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                    </div>
                    <div>
                        <Input
                            {...register(`days.${index}.title`)}
                            placeholder="Day Title (e.g., Arrival in Paro)"
                            className="bg-transparent border-none font-semibold text-lg p-0 h-auto focus-visible:ring-0 text-black w-full"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => index > 0 && moveDay(index, index - 1)} disabled={index === 0}>
                        <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => index < totalDays - 1 && moveDay(index, index + 1)} disabled={index === totalDays - 1}>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => removeDay(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <CardContent className="p-6 space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Main Description</Label>
                            <Textarea
                                {...register(`days.${index}.description`)}
                                placeholder="Summary of the day's events..."
                                className="min-h-[100px] bg-white border-gray-200 text-black resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Day Image</Label>
                            <div className="relative group border-2 border-dashed border-gray-200 rounded-lg h-24 flex items-center justify-center bg-gray-50/50">
                                {dayPreview ? (
                                    <div className="relative w-full h-full overflow-hidden rounded-md">
                                        <img src={dayPreview} alt="Day preview" className="object-cover w-full h-full" />
                                        <label htmlFor={`day-image-${index}`} className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                            <Upload className="h-5 w-5 text-white" />
                                        </label>
                                    </div>
                                ) : (
                                    <label htmlFor={`day-image-${index}`} className="flex flex-col items-center gap-1 cursor-pointer">
                                        <Upload className="h-5 w-5 text-gray-400" />
                                        <span className="text-[10px] text-gray-500">Upload Image</span>
                                    </label>
                                )}
                                <input
                                    id={`day-image-${index}`}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => onDayImageChange(index, e)}
                                />
                                <input type="hidden" {...register(`days.${index}.image`)} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs uppercase tracking-wider text-gray-500 font-bold">Planned Sequence</Label>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => appendItem({ type: "experience", order: itemFields.length })}>
                                    + Experience
                                </Button>
                                <Button type="button" variant="outline" size="sm" className="h-7 text-[10px]" onClick={() => appendItem({ type: "travel", order: itemFields.length, travel: { from: "", to: "" } })}>
                                    + Travel
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {itemFields.map((item, itemIdx) => (
                                <div key={item.id} className="flex gap-2 items-start bg-white p-3 rounded-md border border-gray-100 shadow-sm transition-all group/item">
                                    <div className="mt-2 text-gray-300">
                                        <GripVertical className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        {watch(`days.${index}.items.${itemIdx}.type`) === "experience" ? (
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-amber-50 rounded">
                                                    <Star className="h-3.5 w-3.5 text-amber-600" />
                                                </div>
                                                <Select
                                                    value={watch(`days.${index}.items.${itemIdx}.experienceId`)}
                                                    onValueChange={(val) => setValue(`days.${index}.items.${itemIdx}.experienceId` as any, val)}
                                                >
                                                    <SelectTrigger className="h-8 text-xs border-none bg-gray-50/50 hover:bg-gray-50 focus:ring-0">
                                                        <SelectValue placeholder="Link Experience" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {experienceOptions.map(opt => (
                                                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-blue-50 rounded">
                                                        <ArrowRightLeft className="h-3.5 w-3.5 text-blue-600" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-blue-600 uppercase">Transfer Details</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Select
                                                        value={watch(`days.${index}.items.${itemIdx}.travel.from` as any)}
                                                        onValueChange={(val) => setValue(`days.${index}.items.${itemIdx}.travel.from` as any, val)}
                                                    >
                                                        <SelectTrigger className="h-8 text-xs bg-gray-50/50">
                                                            <SelectValue placeholder="From" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {destinationOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Select
                                                        value={watch(`days.${index}.items.${itemIdx}.travel.to` as any)}
                                                        onValueChange={(val) => setValue(`days.${index}.items.${itemIdx}.travel.to` as any, val)}
                                                    >
                                                        <SelectTrigger className="h-8 text-xs bg-gray-50/50">
                                                            <SelectValue placeholder="To" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {destinationOptions.map(opt => (
                                                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="relative">
                                                        <MapPin className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                                                        <Input {...register(`days.${index}.items.${itemIdx}.travel.location` as any)} placeholder="Location" className="h-8 pl-6 text-xs bg-gray-50/50" />
                                                    </div>
                                                    <div className="relative">
                                                        <Clock className="absolute left-2 top-2.5 h-3 w-3 text-gray-400" />
                                                        <Input {...register(`days.${index}.items.${itemIdx}.travel.timing` as any)} placeholder="Timing" className="h-8 pl-6 text-xs bg-gray-50/50" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <Button type="button" variant="ghost" size="sm" className="h-6 w-6" onClick={() => itemIdx > 0 && moveItem(itemIdx, itemIdx - 1)} disabled={itemIdx === 0}>
                                            <ChevronUp className="h-3 w-3" />
                                        </Button>
                                        <Button type="button" variant="ghost" size="sm" className="h-6 w-6" onClick={() => itemIdx < itemFields.length - 1 && moveItem(itemIdx, itemIdx + 1)} disabled={itemIdx === itemFields.length - 1}>
                                            <ChevronDown className="h-3 w-3" />
                                        </Button>
                                        <Button type="button" variant="ghost" size="sm" className="h-6 w-6 text-red-400" onClick={() => removeItem(itemIdx)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {itemFields.length === 0 && (
                                <div className="text-center py-6 border border-dashed border-gray-100 rounded bg-gray-50/30">
                                    <p className="text-[10px] text-gray-400 italic">No activities added for this day</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Star className="h-4 w-4 text-black" />
                        <span className="text-sm font-semibold italic">Overnight Stay</span>
                    </div>
                    <div className="w-1/2">
                        <Select
                            value={watch(`days.${index}.hotelId`)}
                            onValueChange={(val) => setValue(`days.${index}.hotelId` as any, val)}
                        >
                            <SelectTrigger className="h-10 text-sm bg-white border-gray-200">
                                <SelectValue placeholder="Select Hotel" />
                            </SelectTrigger>
                            <SelectContent>
                                {hotelOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                                {hotelOptions.length === 0 && <SelectItem value="none" disabled>No hotels available</SelectItem>}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Add CSS for thin scrollbar if not available
// .custom-scrollbar::-webkit-scrollbar { width: 4px; }
// .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
