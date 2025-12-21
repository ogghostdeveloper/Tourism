import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getExperiences } from "./actions";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Manage experiences and activities.",
};

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; page_size?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = Number(params.page_size) || 10;

  const paginatedData = await getExperiences(page, pageSize);

  return (
    <div className="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Experiences
          </h2>
          <p className="text-black text-sm">
            Manage experiences and activities.
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
