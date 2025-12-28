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
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { RequestStatus, TourRequest } from "../types";
import { deleteTourRequest, updateTourRequestStatus } from "../actions";
import { toast } from "sonner";

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
                    {new Date(row.original.createdAt).toLocaleDateString()}
                </span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const request = row.original;

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
                        <Link href={`/admin/tour-requests/${request._id}`}>
                            <DropdownMenuItem>
                                View Details
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(request._id!)}
                        >
                            Copy request ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(request.email)}
                        >
                            Copy Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={async () => {
                            const res = await updateTourRequestStatus(request._id!, RequestStatus.APPROVED);
                            if (res.success) toast.success("Request approved");
                            else toast.error("Failed to approve");
                        }}>
                            Mark Approved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            const res = await updateTourRequestStatus(request._id!, RequestStatus.REJECTED);
                            if (res.success) toast.success("Request rejected");
                            else toast.error("Failed to reject");
                        }}>
                            Mark Rejected
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            const res = await updateTourRequestStatus(request._id!, RequestStatus.ARCHIVED);
                            if (res.success) toast.success("Request archived");
                            else toast.error("Failed to archive");
                        }}>
                            Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async () => {
                                if (confirm("Are you sure you want to delete this request?")) {
                                    const res = await deleteTourRequest(request._id!);
                                    if (res.success) toast.success("Request deleted");
                                    else toast.error("Failed to delete");
                                }
                            }}
                            className="text-red-600 focus:text-red-600"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
