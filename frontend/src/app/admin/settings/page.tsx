
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./components/columns";
import { listCosts } from "@/lib/data/settings";
import { SettingsDataTable } from "./components/data-table";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        page_size?: string;
        title?: string;
        travelerCategory?: string;
        isIndianNational?: string;
    }>;
}

export default async function SettingsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const pageSize = Number(params?.page_size) || 10;
    const title = params?.title || "";
    const travelerCategory = params?.travelerCategory || "";
    const isIndianNational = params?.isIndianNational || "";

    const { items, total_pages } = await listCosts(page, pageSize, title, {
        travelerCategory,
        isIndianNational,
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight text-black">
                    Additional Costs
                </h2>
                <p className="text-sm text-neutral-500">
                    Manage additional costs and global settings.
                </p>
            </div>

            <SettingsDataTable
                columns={columns}
                data={items}
                pageCount={total_pages}
                pagination={{
                    pageIndex: page - 1,
                    pageSize: pageSize,
                }}
            />
        </div>
    );
}
