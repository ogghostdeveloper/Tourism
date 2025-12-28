import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getTours } from "./actions";

export const metadata: Metadata = {
    title: "Tours",
    description: "Manage guided tours and expeditions.",
};

export default async function ToursPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; page_size?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const pageSize = Number(params.page_size) || 10;

    const paginatedData = await getTours(page, pageSize);

    return (
        <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-black">
                        Expeditions & Tours
                    </h2>
                    <p className="text-black text-sm text-neutral-500">
                        Manage your curated travel journeys and luxury itineraries.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/admin/tours/new">
                        <Button className="bg-black text-white hover:bg-neutral-800">
                            <Plus className="mr-2 h-4 w-4" /> Add Tour
                        </Button>
                    </Link>
                </div>
            </div>
            <DataTable
                data={paginatedData.items}
                columns={columns}
                pageCount={paginatedData.total_pages}
                pagination={{
                    pageIndex: paginatedData.page - 1,
                    pageSize: paginatedData.page_size,
                }}
            />
        </div>
    );
}
