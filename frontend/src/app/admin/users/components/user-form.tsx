
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatedArrowLeft, AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { userSchema, User } from "../schema";

interface UserFormProps {
    initialData?: User;
    action: (prevState: any, formData: FormData) => Promise<{ success: boolean; message: string }>;
    title: string;
}

export function UserForm({ initialData, action, title: pageTitle }: UserFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();
    const iconRef = React.useRef<AnimatedArrowLeftHandle>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<User>({
        resolver: zodResolver(userSchema) as any,
        defaultValues: initialData || {
            username: "",
            email: "",
            role: "admin",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: User) => {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("role", data.role);
        if (data.password) formData.append("password", data.password);
        if (data.confirmPassword) formData.append("confirmPassword", data.confirmPassword);

        startTransition(async () => {
            try {
                const result = await action(null, formData);
                if (result.success) {
                    toast.success(result.message);
                    router.push("/admin/users");
                    router.refresh();
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("An error occurred while saving user");
            }
        });
    };

    return (
        <div className="flex-1 max-w-7xl mx-auto space-y-4 p-8 pt-6">
            <div className="flex flex-col gap-2">
                <Link href="/admin/users" className="mb-4">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label className="text-black font-medium">Username *</Label>
                        <Input
                            {...register("username")}
                            placeholder="johndoe"
                            className="bg-white border-gray-200 text-black"
                        />
                        {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Email *</Label>
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="john@example.com"
                            className="bg-white border-gray-200 text-black"
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-black font-medium">Role *</Label>
                        <Select
                            value={watch("role")}
                            onValueChange={(val) => setValue("role", val as "admin" | "user")}
                        >
                            <SelectTrigger className="bg-white border-gray-200 text-black">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-black font-medium">
                                {initialData ? "New Password (Optional)" : "Password *"}
                            </Label>
                            <Input
                                {...register("password")}
                                type="password"
                                placeholder="••••••"
                                className="bg-white border-gray-200 text-black"
                            />
                            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-black font-medium">Confirm Password</Label>
                            <Input
                                {...register("confirmPassword")}
                                type="password"
                                placeholder="••••••"
                                className="bg-white border-gray-200 text-black"
                            />
                            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={isPending} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        {initialData ? "Update User" : "Create User"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
