"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { tourSchema, Tour } from "../schema";
import { getCategoriesForDropdown, getDestinationsForDropdown, getExperiencesForDropdown, getHotelsForDropdown } from "../actions";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { generateSlug } from "@/utils/slugGenerator";
import { Combobox } from "./combobox-wrapper";
import { DaySection } from "./day-section";

import { MultiSelect } from "@/components/ui/multi-select";
import { Cost } from "../../settings/schema";

interface TourFormProps {
    initialData?: Tour;
    action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
    title: string;
    allCosts?: Cost[];
}

export function TourForm({ initialData, action, title: pageTitle, allCosts = [] }: TourFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [dayFiles, setDayFiles] = React.useState<{ [key: number]: File }>({});

    const [categoryOptions, setCategoryOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [experienceOptions, setExperienceOptions] = React.useState<{ value: string; label: string; price?: number }[]>([]);
    const [hotelOptions, setHotelOptions] = React.useState<{ value: string; label: string; price?: number }[]>([]);
    const [destinationOptions, setDestinationOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [isLoadingOptions, setIsLoadingOptions] = React.useState(true);
    const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

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
            price: Number(initialData.price),
            priority: initialData.priority ?? 0,
            category: initialData.category ?? "",
            highlights: initialData.highlights ?? [],
            days: initialData.days ?? [],
            selectedCostIds: initialData.selectedCostIds ?? [],
        } : {
            title: "",
            slug: "",
            description: "",
            image: "",
            duration: "",
            price: 0,
            priority: 0,
            category: "",
            highlights: [],
            days: [],
            selectedCostIds: [],
        },
    });

    const watchedTitle = watch("title");
    const watchedSelectedCostIds = watch("selectedCostIds") || [];
    const watchedDays = watch("days") || [];

    React.useEffect(() => {
        if (watchedTitle) {
            const slug = generateSlug(watchedTitle);
            setValue("slug", slug);
        }
    }, [watchedTitle, setValue]);

    const { fields: dayFields, append: appendDay, remove: removeDay, move: moveDay } = useFieldArray({
        control,
        name: "days",
    });

    const calculateTotal = React.useCallback(() => {
        const currentDays = watch("days") || [];
        const currentCostIds = watch("selectedCostIds") || [];

        let total = 0;

        // Add selected global costs
        currentCostIds.forEach(id => {
            const cost = allCosts.find(c => c.id === id || c._id === id);
            if (cost) {
                if (cost.type === 'daily') {
                    total += (Number(cost.price) || 0) * currentDays.length;
                } else {
                    total += (Number(cost.price) || 0);
                }
            }
        });

        currentDays.forEach(day => {
            if (day.hotelId) {
                const hotel = hotelOptions.find(h => h.value === day.hotelId);
                if (hotel?.price != null) total += Number(hotel.price) || 0;
            }
            day.items?.forEach(item => {
                if (item.type === 'experience' && item.experienceId) {
                    const exp = experienceOptions.find(e => e.value === item.experienceId);
                    if (exp?.price != null) total += Number(exp.price) || 0;
                }
            });
        });
        return total;
    }, [watch, hotelOptions, experienceOptions, allCosts]);

    // Watch for changes in days to auto-calculate price
    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name?.includes('days')) {
                const newTotal = calculateTotal();
                setValue("price", newTotal);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, calculateTotal, setValue]);

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

    const onSubmit = (data: Tour) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("slug", data.slug);
        formData.append("category", data.category || "");
        formData.append("description", data.description);
        formData.append("duration", data.duration);
        formData.append("price", String(data.price));
        formData.append("priority", String(data.priority));
        formData.append("highlights", JSON.stringify(data.highlights || []));
        formData.append("days", JSON.stringify(data.days));
        formData.append("image", data.image);
        formData.append("selectedCostIds", JSON.stringify(data.selectedCostIds || []));

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
                <h2 className="text-2xl font-semibold tracking-tight text-black">
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
                            className="bg-white border-gray-200 text-black"
                        />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Slug *</Label>
                        <Input
                            {...register("slug")}
                            placeholder="spiritual-discovery-nepal-bhutan"
                            className="text-black bg-gray-100 cursor-not-allowed"
                            readOnly
                        />
                        {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Category</Label>
                        <Combobox
                            options={categoryOptions}
                            value={watch("category") || ""}
                            onChange={(val) => setValue("category", val)}
                            placeholder="Select Category"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Duration</Label>
                        <Input
                            {...register("duration")}
                            placeholder="14 Days / 13 Nights"
                            className="bg-white border-gray-200 text-black"
                        />
                    </div>



                    <div className="space-y-2">
                        <Label className="text-black font-medium">Additional Costs</Label>
                        <MultiSelect
                            options={allCosts.map(cost => ({
                                value: (cost.id || cost._id) as string,
                                label: `${cost.title} (${cost.type === 'daily' ? 'Daily' : 'Fixed'}: $${cost.price})`
                            }))}
                            selected={watchedSelectedCostIds}
                            onChange={(vals) => {
                                setValue("selectedCostIds", vals);
                                // Optional: auto-trigger calculation when selection changes
                                setValue("price", calculateTotal());
                            }}
                            placeholder="Select costs to include..."
                        />
                        <p className="text-[10px] text-zinc-500 italic">
                            These costs are used only for the "Auto Calculate" function below.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Priority (Lower = Higher Priority)</Label>
                        <Input
                            type="number"
                            {...register("priority", { valueAsNumber: true })}
                            placeholder="0"
                            className="bg-white border-gray-200 text-black"
                        />
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
                    <ImageUpload
                        name="imageFile"
                        label="Cover Image"
                        defaultPreview={initialData?.image}
                        required
                        onFileSelect={setSelectedFile}
                    />
                </div>

                <div className="space-y-6 border-t border-gray-100 pt-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-black serif underline underline-offset-8 decoration-gray-200">Daily Itinerary</h3>
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
                        {dayFields.length === 0 ? (
                            <div className="border-2 border-dashed border-gray-200 rounded-none p-12 flex flex-col items-center justify-center text-center space-y-3 bg-gray-50/50">
                                <div className="p-3 bg-white rounded-full shadow-sm">
                                    <Plus className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold text-gray-900">No days added yet</h4>
                                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                        Start building the itinerary by adding the first day. You can add experiences, hotels, and travel details for each day.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            dayFields.map((field, index) => (
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
                                    defaultImage={initialData?.days?.[index]?.image}
                                    onFileSelect={(file) => setDayFiles(prev => ({ ...prev, [index]: file }))}
                                />
                            ))
                        )}
                    </div>
                    <div className="flex items-center justify-end">
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

                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <Label className="text-black font-medium text-base">Total Price (USD)</Label>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                onClick={() => {
                                    const total = calculateTotal();
                                    setValue("price", total);
                                    toast.success(`Calculated price based on selected items: $${total}`);
                                }}
                            >
                                Auto Calculate (Sync)
                            </Button>
                        </div>
                        <Input
                            type="number"
                            {...register("price", { valueAsNumber: true })}
                            placeholder="0.00"
                            className="bg-white border-gray-200 text-black font-medium text-lg"
                        />
                        {watchedSelectedCostIds.length > 0 && (
                            <div className="space-y-1 mt-1">
                                <p className="text-xs text-amber-600 font-medium">
                                    * Includes {watchedSelectedCostIds.length} selected global fees based on {watchedDays.length} days
                                </p>
                            </div>
                        )}
                        {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-4 border-t border-gray-100 pt-12">
                    <Button variant="outline" type="button" asChild className="text-black border-gray-200">
                        <Link href="/admin/tours">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isPending} className="bg-amber-600 text-white hover:bg-amber-700 min-w-[150px]">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                {initialData ? "Update Tour" : "Create Tour"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
