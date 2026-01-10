
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Cost } from "../schema";
import { deleteCostAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Cost>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "price",
        header: "Price (USD)",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            return <div className="font-medium">${price.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive");
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {isActive ? "Active" : "Inactive"}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const cost = row.original;
            const router = useRouter();

            const handleDelete = async () => {
                if (confirm("Are you sure you want to delete this cost?")) {
                    const result = await deleteCostAction(cost._id!);
                    if (result.success) {
                        toast.success(result.message);
                        router.refresh();
                    } else {
                        toast.error(result.message);
                    }
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/settings/${cost._id}/edit`} className="flex items-center cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600 cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
