"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ExperienceType } from "../schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

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

export const columns: ColumnDef<ExperienceType>[] = [
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
        accessorKey: "displayOrder",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order" />
        ),
        cell: ({ row }) => {
            return (
                <div className="text-gray-500">
                    {row.getValue("displayOrder")}
                </div>
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
