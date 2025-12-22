"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Destination } from "../schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
function ImageCell({ imageUrl, alt }: { imageUrl?: string; alt: string }) {
  if (!imageUrl) {
    return <div className="h-10 w-16 rounded bg-muted" />;
  }
  return (
    <div className="h-10 w-16 overflow-hidden rounded bg-muted">
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

export const columns: ColumnDef<Destination>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <ImageCell imageUrl={row.original.image} alt={row.original.name} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div
          className="max-w-[300px] truncate font-medium text-black"
          title={row.getValue("name")}
        >
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate text-black">
          {row.getValue("region")}
        </div>
      );
    },
  },
  {
    accessorKey: "highlights",
    header: "Highlights",
    cell: ({ row }) => {
      const highlights = row.original.highlights;
      return (
        <div className="max-w-[250px] truncate text-sm text-black">
          {highlights.slice(0, 2).join(", ")}
          {highlights.length > 2 && "..."}
        </div>
      );
    },
  },
  {
    accessorKey: "experiences",
    header: "Experiences",
    cell: ({ row }) => {
      const experiences = row.original.experiences || [];
      return (
        <div className="text-sm">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {experiences.length} linked
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "hotels",
    header: "Hotels",
    cell: ({ row }) => {
      const hotels = row.original.hotels || [];
      return (
        <div className="text-sm">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
            {hotels.length} linked
          </span>
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
          <div className="text-sm text-black">
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
