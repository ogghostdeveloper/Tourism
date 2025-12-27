"use client";

import { useTransition } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteExperienceType } from "../actions";
import { ExperienceType } from "../schema";

interface DeleteExperienceTypeDialogProps {
    experienceType: ExperienceType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteExperienceTypeDialog({
    experienceType,
    open,
    onOpenChange,
}: DeleteExperienceTypeDialogProps) {
    const [isPending, startTransition] = useTransition();

    const onDelete = () => {
        startTransition(async () => {
            try {
                const result = await deleteExperienceType(experienceType.slug);
                if (result.success) {
                    toast.success(result.message);
                    onOpenChange(false);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-white border-gray-200">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-black">Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-500">
                        This will permanently delete the experience type{" "}
                        <span className="font-semibold text-black">
                            "{experienceType.title}"
                        </span>
                        . This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-200 text-gray-500 hover:bg-gray-50">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onDelete();
                        }}
                        disabled={isPending}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
