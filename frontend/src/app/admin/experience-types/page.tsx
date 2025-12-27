import { Metadata } from "next";
import { DataTable } from "./components/data-table";
import { getExperienceTypes } from "./actions";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns } from "./components/columns";

export const metadata: Metadata = {
    title: "Experience Types",
    description: "Manage experience categories.",
};

export default async function ExperienceTypesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; page_size?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const pageSize = Number(params.page_size) || 10;

    const paginatedData = await getExperienceTypes(page, pageSize);

    return (
        <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight text-black">
                        Experience Types
                    </h2>
                    <p className="text-black text-sm">
                        Manage experience categories and their featured content.
                    </p>
                </div>
                <Button asChild className="bg-black text-white hover:bg-black/90">
                    <Link href="/admin/experience-types/new" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Type
                    </Link>
                </Button>
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
