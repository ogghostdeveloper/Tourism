"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Tour } from "../schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getExperienceTypeById } from "@/app/admin/experience-types/actions";

function ImageCell({ imageUrl, alt }: { imageUrl?: string; alt: string }) {
    if (!imageUrl) {
        return <div className="h-10 w-16 rounded bg-muted" />;
    }
    return (
        <div className="h-10 w-16 overflow-hidden rounded bg-muted border border-gray-100 shadow-sm">
            <img
                src={imageUrl}
                alt={alt}
                className="h-full w-full object-cover"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
        </div>
    );
}

function CategoryCell({ categoryId }: { categoryId?: string }) {
    const [categoryName, setCategoryName] = useState<string>("Loading...");

    useEffect(() => {
        if (!categoryId) {
            setCategoryName("-");
            return;
        }

        const fetchCategory = async () => {
            try {
                const experienceType = await getExperienceTypeById(categoryId);
                setCategoryName(experienceType?.title || categoryId);
            } catch (error) {
                setCategoryName(categoryId);
            }
        };

        fetchCategory();
    }, [categoryId]);

    if (!categoryName || categoryName === "-") return <span className="text-gray-400">-</span>;

    return (
        <Badge variant="outline" className="font-normal border-gray-200 text-black bg-gray-50/50">
            {categoryName}
        </Badge>
    );
}

export const columns: ColumnDef<Tour>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <ImageCell imageUrl={row.original.image} alt={row.original.title} />
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="max-w-[300px] truncate font-medium text-black">
                    {row.getValue("title")}
                </div>
            );
        },
    },
    {
        accessorKey: "slug",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Slug" />
        ),
        cell: ({ row }) => {
            return (
                <div className="max-w-[200px] truncate font-mono text-xs text-gray-500">
                    {row.getValue("slug")}
                </div>
            );
        },
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const category = row.getValue("category") as string;
            return <CategoryCell categoryId={category} />;
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price") as string);
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(isNaN(amount) ? 0 : amount);
            return <div className="text-sm text-gray-600">{formatted}</div>;
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            const priority = row.getValue("priority") as number;
            return (
                <div className="font-mono text-xs text-center">{priority ?? 0}</div>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => {
            const date = row.getValue("createdAt");
            if (!date) return "-";
            return (
                <div className="text-xs text-gray-500">
                    {format(new Date(date as string), "PP")}
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
