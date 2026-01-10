
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./components/columns";
import { listCosts } from "@/lib/data/settings";
import { SettingsDataTable } from "./components/data-table";

interface PageProps {
    searchParams: {
        page?: string;
        page_size?: string;
        title?: string;
    };
}

export default async function SettingsPage({ searchParams }: PageProps) {
    const page = Number(searchParams?.page) || 1;
    const pageSize = Number(searchParams?.page_size) || 10;
    const title = searchParams?.title || "";

    const { items, total_pages } = await listCosts(page, pageSize, title);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-black serif">Settings</h1>
                <p className="text-gray-500 mt-2">Manage additional costs and global settings.</p>
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
