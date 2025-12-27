
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getTourRequests } from "./actions";

export const metadata: Metadata = {
  title: "Tour Requests",
  description: "Manage incoming tour inquiries.",
};

export default async function TourRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; page_size?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.page_size) || 10;

  const paginatedData = await getTourRequests(page, pageSize);

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Tour Requests
          </h2>
          <p className="text-black text-sm">
            Manage incoming traveler inquiries and package requests.
          </p>
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
