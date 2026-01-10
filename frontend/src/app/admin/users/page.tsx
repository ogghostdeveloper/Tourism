
import { listUsers } from "@/lib/data/users";
import { UsersDataTable } from "./components/data-table";
import { columns } from "./components/columns";

interface PageProps {
    searchParams: {
        page?: string;
        page_size?: string;
        search?: string;
    };
}

export default async function UsersPage({ searchParams }: PageProps) {
    const page = Number(searchParams?.page) || 1;
    const pageSize = Number(searchParams?.page_size) || 10;
    const search = searchParams?.search || "";

    const { items, total_pages } = await listUsers(page, pageSize, search);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold tracking-tight text-black">
                    Users
                </h2>
                <p className="text-sm text-neutral-500">
                    Manage administrative users and permissions.
                </p>
            </div>

            <UsersDataTable
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
