import { useState, useRef } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";
import { destinationSchema } from "../schema";
import { AnimatedArrowLeft } from "@/components/ui/animated-arrow-left";
import type { AnimatedArrowLeftHandle } from "@/components/ui/animated-arrow-left";
import { DeleteDestinationDialog } from "./delete-destination-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const destination = destinationSchema.parse(row.original);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const editRef = useRef<AnimatedArrowLeftHandle>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(destination.name);
    toast.success("Destination name copied to clipboard");
  };

  return (
    <>
      <DeleteDestinationDialog
        destination={destination}
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
        <DropdownMenuContent align="end" className="w-[160px]">
          <Link href={`/admin/destinations/${destination.slug}/edit`}>
            <DropdownMenuItem
              className="text-blue-500 focus:text-blue-500 data-[variant=default]:text-blue-500 data-[variant=default]:focus:bg-blue-100"
            >
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={handleCopy}
            className="text-gray-500 focus:text-gray-500 data-[variant=default]:text-gray-500 data-[variant=default]:focus:bg-gray-100"
          >
            Copy Name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-500 focus:text-red-500 data-[variant=default]:text-red-500 data-[variant=default]:focus:bg-red-100"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
