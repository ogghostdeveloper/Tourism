"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Hotel } from "../schema";
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

export const columns: ColumnDef<Hotel>[] = [
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
    accessorKey: "destinationSlug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
    cell: ({ row }) => {
      const slug = row.getValue("destinationSlug") as string;
      return (
        <div className="text-black capitalize">
          {slug}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate text-black">
          {row.getValue("location") || "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium text-black">{rating}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => {
      return (
        <div className="text-sm font-medium text-black">
          {row.getValue("priceRange")}
        </div>
      );
    },
  },
  {
    accessorKey: "rooms",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rooms" />
    ),
    cell: ({ row }) => {
      const rooms = row.getValue("rooms");
      return (
        <div className="text-sm text-black">
          {rooms ? `${rooms} rooms` : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "amenities",
    header: "Amenities",
    cell: ({ row }) => {
      const amenities = row.original.amenities || [];
      return (
        <div className="max-w-[250px] truncate text-sm text-black">
          {amenities.slice(0, 3).join(", ")}
          {amenities.length > 3 && "..."}
          {amenities.length === 0 && "-"}
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
