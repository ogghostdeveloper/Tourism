"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { AboutSection } from "../schema";
import { Check, X } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<AboutSection>[] = [
  {
    accessorKey: "order",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-12 font-medium text-black">
          {row.getValue("order")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div
          className="max-w-[300px] truncate font-medium text-black"
          title={row.getValue("title")}
        >
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
        <div className="max-w-[200px] truncate text-black">
          {row.getValue("slug")}
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const content = row.original.content;
      return (
        <div className="max-w-[350px] truncate text-sm text-gray-600">
          {content}
        </div>
      );
    },
  },
  {
    accessorKey: "isVisible",
    header: "Visible",
    cell: ({ row }) => {
      const isVisible = row.original.isVisible;
      return (
        <div className="text-sm">
          {isVisible ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <X className="w-4 h-4 text-red-600" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      if (!date) return null;
      try {
        return (
          <div className="text-sm text-gray-600">
            {format(new Date(date), "MMM dd, yyyy")}
          </div>
        );
      } catch {
        return null;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
