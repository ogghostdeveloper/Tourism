"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ExperienceType } from "../schema";

interface ExperienceTypeFormProps {
    initialData?: ExperienceType;
    action: (prevState: any, formData: FormData) => Promise<{ success: boolean; message: string }>;
    title: string;
}

export function ExperienceTypeForm({ initialData, action, title }: ExperienceTypeFormProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image || null);
    const [isDragging, setIsDragging] = useState(false);

    const [state, formAction, isPending] = useActionState(action, {
        success: false,
        message: "",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            if (fileInputRef.current) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                fileInputRef.current.files = dataTransfer.files;
                handleImageChange({ target: { files: dataTransfer.files } } as any);
            }
        }
    };

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            router.push("/admin/experience-types");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state.success, state.message, router]);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" className="text-gray-500">
                        <Link href="/admin/experience-types">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <h2 className="text-2xl font-bold tracking-tight text-black">{title}</h2>
                </div>
            </div>

            <form action={formAction} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-black">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={initialData?.title}
                                placeholder="e.g. Wellness & Rejuvenation"
                                required
                                className="bg-white border-gray-200 text-black"
                                onChange={(e) => {
                                    const slugInput = document.getElementById('slug') as HTMLInputElement;
                                    if (slugInput && !initialData) {
                                        slugInput.value = e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                    }
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-black">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                defaultValue={initialData?.slug}
                                placeholder="e.g. wellness"
                                required
                                className="bg-white border-gray-200 text-black"
                                readOnly={!!initialData}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="displayOrder" className="text-black">Display Order</Label>
                            <Input
                                id="displayOrder"
                                name="displayOrder"
                                type="number"
                                defaultValue={initialData?.displayOrder || 0}
                                placeholder="0"
                                className="bg-white border-gray-200 text-black"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Label className="text-black">Cover Image</Label>
                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className={`
                relative aspect-video rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden
                ${isDragging ? "border-amber-600 bg-amber-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100"}
              `}
                        >
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewUrl(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-black">Drag & drop or click to upload</p>
                                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                    </div>
                                </>
                            )}
                            <input
                                type="file"
                                name="image"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                required={!initialData}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-black">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        defaultValue={initialData?.description}
                        placeholder="Describe this experience type..."
                        required
                        className="min-h-[150px] bg-white border-gray-200 text-black"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        asChild
                        className="border-gray-200 text-gray-500 hover:bg-gray-50"
                    >
                        <Link href="/admin/experience-types">Cancel</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-black text-white hover:bg-black/90 min-w-[120px]"
                    >
                        {isPending ? "Saving..." : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
