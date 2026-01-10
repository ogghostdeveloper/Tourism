
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../schema";
import { Button } from "@/components/ui/button";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUserAction } from "../actions";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => {
            return <span className="font-medium text-black">{row.getValue("username")}</span>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            return <span className="text-gray-600">{row.getValue("email")}</span>;
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            return (
                <Badge variant={role === "admin" ? "default" : "outline"} className={role === "admin" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}>
                    {role.toUpperCase()}
                </Badge>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Joined",
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as string;
            return <span className="text-gray-500">{date ? new Date(date).toLocaleDateString() : "-"}</span>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            const onDelete = async () => {
                if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
                    const result = await deleteUserAction(user.id!);
                    if (result.success) {
                        toast.success(result.message);
                    } else {
                        toast.error(result.message);
                    }
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-black">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-gray-200">
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}/edit`} className="cursor-pointer flex items-center gap-2 text-black">
                                <Edit2 className="h-4 w-4" /> Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={onDelete}
                            className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600"
                        >
                            <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
