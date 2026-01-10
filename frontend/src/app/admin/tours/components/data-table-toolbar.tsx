"use client";

import { Table } from "@tanstack/react-table";
import { X, Plus, LayoutGrid, List } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    view?: "list" | "grid";
    onViewChange?: (view: "list" | "grid") => void;
}

export function DataTableToolbar<TData>({
    table,
    view,
    onViewChange,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
                <Input
                    placeholder="Search tours..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px] text-black"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.resetColumnFilters()}
                        className="text-black"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-2">
                <DataTableViewOptions table={table} />
                <Link href="/admin/tours/create">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New
                    </Button>
                </Link>
                {view && onViewChange && (
                    <div className="flex items-center gap-1 border border-gray-100 rounded-none p-1 bg-white shadow-xs">
                        <Button
                            variant={view === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onViewChange("list")}
                            className={`h-7 w-7 p-0 rounded-none transition-all ${view === "list" ? "bg-black text-white" : "text-gray-400 hover:text-black hover:bg-gray-50"}`}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={view === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onViewChange("grid")}
                            className={`h-7 w-7 p-0 rounded-none transition-all ${view === "grid" ? "bg-black text-white" : "text-gray-400 hover:text-black hover:bg-gray-50"}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
