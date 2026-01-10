
"use client";

import { Table } from "@tanstack/react-table";
import { X, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function SettingsDataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Search global costs..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-9 w-[150px] lg:w-[350px] text-black"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.resetColumnFilters()}
                        className="h-9 text-black"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
                    <Link href="/admin/settings/create">
                        <Plus className="mr-2 h-4 w-4" /> Add Cost
                    </Link>
                </Button>
            </div>
        </div>
    );
}
