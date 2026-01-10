"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Hotel } from "../schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { useEffect, useState } from "react";
import { getDestinationById } from "@/app/admin/destinations/actions";


function ImageCell({ imageUrl, alt }: { imageUrl?: string; alt: string }) {
  if (!imageUrl) {
    return <div className="h-10 w-16 rounded bg-muted" />;
  }
  return (
    <div className="h-10 w-16 overflow-hidden rounded-none bg-muted">
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

function DestinationCell({ destinationId }: { destinationId?: string }) {
  const [destinationName, setDestinationName] = useState<string>("Loading...");

  useEffect(() => {
    if (!destinationId) {
      setDestinationName("-");
      return;
    }

    const fetchDestination = async () => {
      try {
        const destination = await getDestinationById(destinationId);
        setDestinationName(destination?.name || destinationId);
      } catch (error) {
        setDestinationName(destinationId);
      }
    };

    fetchDestination();
  }, [destinationId]);

  return (
    <div className="text-xs text-zinc-500">
      {destinationName}
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
          className="max-w-[300px] truncate font-semibold text-zinc-900"
          title={row.getValue("name")}
        >
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
    cell: ({ row }) => {
      // Try to get destination ID from multiple possible fields
      const destinationId = row.original.destination || row.original.destinationId || row.original.destinationSlug;
      return <DestinationCell destinationId={destinationId} />;
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px] truncate font-mono text-xs text-zinc-500">
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
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Updated" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as string;
      if (!date) return null;
      try {
        return (
          <div className="text-xs text-zinc-500">
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
