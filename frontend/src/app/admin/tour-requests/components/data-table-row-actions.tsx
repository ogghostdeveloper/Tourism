"use client";

import { Row } from "@tanstack/react-table";
import { Eye, Mail, MoreHorizontal, Trash2, CheckCircle2, XCircle, Archive, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { RequestStatus, TourRequest } from "../types";
import { deleteTourRequest, updateTourRequestStatus } from "../actions";

import { useState } from "react";
import { DeleteTourRequestDialog } from "./delete-tour-request-dialog";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const request = row.original as TourRequest;

    const onStatusUpdate = async (status: RequestStatus) => {
        const res = await updateTourRequestStatus(request._id!, status);
        if (res.success) {
            toast.success(`Request ${status} successfully`);
        } else {
            toast.error(`Failed to update status: ${res.error}`);
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(request.email);
        toast.success("Email copied to clipboard");
    };

    return (
        <>
            <DeleteTourRequestDialog
                request={request}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="data-[state=open]:bg-muted size-8"
                    >
                        <MoreHorizontal className="text-black" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                    <Link href={`/admin/tour-requests/${request._id}`}>
                        <DropdownMenuItem className="text-blue-500 focus:text-blue-500 data-[variant=default]:text-blue-500 data-[variant=default]:focus:bg-blue-50">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={copyEmail} className="text-gray-700">
                        <Mail className="mr-2 h-4 w-4" /> Copy Email
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {request.status !== RequestStatus.APPROVED && (
                        <DropdownMenuItem
                            onClick={() => onStatusUpdate(RequestStatus.APPROVED)}
                            className="text-green-600 focus:text-green-600 data-[variant=default]:text-green-600 data-[variant=default]:focus:bg-green-50"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                    )}

                    {request.status !== RequestStatus.REJECTED && (
                        <DropdownMenuItem
                            onClick={() => onStatusUpdate(RequestStatus.REJECTED)}
                            className="text-amber-600 focus:text-amber-600 data-[variant=default]:text-amber-600 data-[variant=default]:focus:bg-amber-50"
                        >
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                    )}

                    {request.status !== RequestStatus.ARCHIVED && (
                        <DropdownMenuItem
                            onClick={() => onStatusUpdate(RequestStatus.ARCHIVED)}
                            className="text-gray-600 focus:text-gray-600 data-[variant=default]:text-gray-600 data-[variant=default]:focus:bg-gray-50"
                        >
                            <Archive className="mr-2 h-4 w-4" /> Archive
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-red-500 focus:text-red-500 data-[variant=default]:text-red-500 data-[variant=default]:focus:bg-red-50"
                    >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
