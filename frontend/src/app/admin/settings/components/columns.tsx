
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Cost } from "../schema";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Cost>[] = [
    {
        accessorKey: "title",
        header: "Cost Setting",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="font-semibold text-zinc-900 truncate max-w-[250px]" title={row.getValue("title")}>
                        {row.getValue("title")}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono tracking-tight lowercase">
                        {row.original.description ? (row.original.description.length > 50 ? row.original.description.substring(0, 50) + "..." : row.original.description) : "Global fee setting"}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            return (
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-700">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase font-medium tracking-tight">USD Rate</span>
                </div>
            );
        },
    },
    {
        accessorKey: "type",
        header: "Charge Type",
        cell: ({ row }) => {
            const type = row.getValue("type") as string || "fixed";
            const colors: Record<string, string> = {
                fixed: "bg-blue-100 text-blue-800 border-blue-200",
                daily: "bg-amber-100 text-amber-800 border-amber-200",
            };
            return (
                <div className="flex flex-col gap-1">
                    <span className={`w-fit inline-flex items-center rounded-none px-2 py-0.5 text-[9px] font-bold border uppercase tracking-wider ${colors[type] || "bg-gray-100 text-gray-800"}`}>
                        {type}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "travelerCategory",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("travelerCategory") as string || "adult";
            const labelMap: Record<string, string> = {
                adult: "Adult",
                child_6_12: "Child (6-12)",
                child_under_6: "Child < 6",
            };
            return (
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-700">{labelMap[category]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "isIndianNational",
        header: "Indian",
        cell: ({ row }) => {
            const isIndian = row.getValue("isIndianNational") as boolean;
            return (
                <div className="flex flex-col gap-1">
                    <span className={`w-fit inline-flex items-center rounded-none px-2 py-0.5 text-[9px] font-bold border uppercase tracking-wider ${isIndian ? "bg-orange-100 text-orange-800 border-orange-200" : "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
                        {isIndian ? "Indian" : "Intl"}
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
