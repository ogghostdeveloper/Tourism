"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { RequestStatus, TourRequest } from "../types";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<TourRequest>[] = [
    {
        accessorKey: "firstName",
        header: "Name",
        cell: ({ row }) => (
            <div>
                <div className="font-medium text-black">{row.original.firstName} {row.original.lastName}</div>
                <div className="text-xs text-gray-500">{row.original.email}</div>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="text-xs text-gray-500">{row.original.email}</div>
        ),
    },
    {
        accessorKey: "tourId",
        header: "Package",
        cell: ({ row }) => (
            <div className="text-sm text-gray-700">
                {row.original.tourId ? (
                    <span className="font-medium text-black">Selected: {row.original.tourId}</span>
                ) : (
                    <span className="italic text-gray-400">Custom Inquiry</span>
                )}
            </div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge
                    className={`
            ${status === RequestStatus.APPROVED ? "bg-green-100 text-green-700 border-green-200" : ""}
            ${status === RequestStatus.PENDING ? "bg-amber-100 text-amber-700 border-amber-200" : ""}
            ${status === RequestStatus.REJECTED ? "bg-red-100 text-red-700 border-red-200" : ""}
            ${status === RequestStatus.ARCHIVED ? "bg-gray-100 text-gray-700 border-gray-200" : ""}
          `}
                    variant="outline"
                >
                    {status.toUpperCase()}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            return (
                <span className="text-xs text-gray-500">
                    {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : "N/A"}
                </span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
