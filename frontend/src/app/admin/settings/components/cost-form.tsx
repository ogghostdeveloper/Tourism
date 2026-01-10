
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import { costSchema, Cost } from "../schema";
import { AnimatedArrowLeft, AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import * as React from "react";

interface CostFormProps {
    initialData?: Cost;
    action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
    title: string;
}

export function CostForm({ initialData, action, title: pageTitle }: CostFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<Cost>({
        resolver: zodResolver(costSchema) as any,
        defaultValues: initialData || {
            title: "",
            description: "",
            price: 0,
            isActive: true,
        },
    });

    const onSubmit = (data: Cost) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        formData.append("price", String(data.price));
        formData.append("isActive", String(data.isActive));

        startTransition(async () => {
            const result = await action(formData);
            if (result.success) {
                toast.success(result.message);
                router.push("/admin/settings");
                router.refresh();
            } else {
                toast.error(result.message);
            }
        });
    };

    const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

    return (
        <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <Link href="/admin/settings" className="mb-4">
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
                <h2 className="text-2xl font-semibold tracking-tight text-black serif">
                    {pageTitle}
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <div className="space-y-2">
                    <Label className="text-black font-medium">Title *</Label>
                    <Input
                        {...register("title")}
                        placeholder="e.g. Sustainable Development Fee (SDF)"
                        className="bg-white border-gray-200 text-black"
                    />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label className="text-black font-medium">Description</Label>
                    <Textarea
                        {...register("description")}
                        placeholder="Describe what this fee covers..."
                        className="min-h-[120px] bg-white border-gray-200 text-black resize-none"
                    />
                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-black font-medium">Price (USD) *</Label>
                        <Input
                            type="number"
                            {...register("price", { valueAsNumber: true })}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="bg-white border-gray-200 text-black"
                        />
                        {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="flex items-center space-x-2 pt-8">
                        <Checkbox
                            id="isActive"
                            checked={watch("isActive")}
                            onCheckedChange={(checked) => setValue("isActive", checked as boolean)}
                            className="border-gray-300"
                        />
                        <Label htmlFor="isActive" className="cursor-pointer text-black font-medium">Active (Applied to new tours)</Label>
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={isPending} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Update Cost" : "Add Cost"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
