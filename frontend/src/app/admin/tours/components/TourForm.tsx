"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import { tourSchema, Tour } from "../schema";
import { createTourAction, updateTourAction } from "../actions";

interface TourFormProps {
    initialData?: Tour;
}

export function TourForm({ initialData }: TourFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<Tour>({
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

    const onSubmit = async (data: Tour) => {
        startTransition(async () => {
            try {
                const result = initialData?._id
                    ? await updateTourAction(initialData._id, data)
                    : await createTourAction(data);

                if (result.success) {
                    toast.success(initialData ? "Tour updated" : "Tour created");
                    router.push("/admin/tours");
                } else {
                    toast.error(result.message || "Something went wrong");
                }
            } catch (error) {
                toast.error("Failed to save tour");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input {...register("title")} placeholder="Spiritual Discovery: Nepal & Bhutan" className="text-black" />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Slug *</Label>
                    <Input {...register("slug")} placeholder="spiritual-discovery-nepal-bhutan" className="text-black" />
                    {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Category</Label>
                    <Input {...register("category")} placeholder="Spiritual & Cultural" className="text-black" />
                </div>

                <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input {...register("duration")} placeholder="14 Days / 13 Nights" className="text-black" />
                </div>

                <div className="space-y-2">
                    <Label>Price</Label>
                    <Input {...register("price")} placeholder="From $8,500 per person" className="text-black" />
                </div>

                <div className="space-y-2">
                    <Label>Cover Image URL *</Label>
                    <Input {...register("image")} placeholder="https://images.unsplash.com/..." className="text-black" />
                    {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea {...register("description")} placeholder="Describe the tour..." className="min-h-[100px] text-black" />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="featured"
                    checked={watch("featured")}
                    onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                />
                <Label htmlFor="featured" className="text-sm font-medium leading-none cursor-pointer">
                    Show as Featured Tour
                </Label>
            </div>

            <div className="space-y-4 border-t pt-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-black italic serif">Itinerary Days</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendDay({ day: dayFields.length + 1, title: "", description: "", activities: [], highlights: [], experiences: [] })}>
                        <Plus className="mr-2 h-4 w-4" /> Add Day
                    </Button>
                </div>

                <div className="space-y-4">
                    {dayFields.map((field, index) => (
                        <div key={field.id} className="border rounded-md p-6 space-y-4 bg-white relative group">
                            <div className="flex items-center justify-between border-b pb-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <GripVertical className="text-gray-300 cursor-move" />
                                    <span className="font-mono text-xs font-bold text-amber-600">DAY {index + 1}</span>
                                    <Input {...register(`days.${index}.title`)} placeholder="Arrival in Kathmandu" className="h-8 py-1 text-sm font-semibold max-w-[300px]" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="ghost" size="icon" onClick={() => index > 0 && moveDay(index, index - 1)} disabled={index === 0}>
                                        <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => index < dayFields.length - 1 && moveDay(index, index + 1)} disabled={index === dayFields.length - 1}>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => removeDay(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-widest text-gray-500">Day Description</Label>
                                    <Textarea {...register(`days.${index}.description`)} placeholder="Describe the day's events..." className="text-sm min-h-[80px]" />
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-gray-500">Day Image URL</Label>
                                        <Input {...register(`days.${index}.image`)} placeholder="https://..." className="h-8 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-gray-500">Accommodation</Label>
                                        <Input {...register(`days.${index}.accommodation`)} placeholder="Dwarika's Hotel" className="h-8 text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 border-t pt-8">
                <Link href="/admin/tours">
                    <Button variant="outline" type="button" className="text-black">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isPending}>
                    {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (initialData ? "Update Tour" : "Create Tour")}
                </Button>
            </div>
        </form>
    );
}
