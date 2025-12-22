"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { DestinationCard } from "@/components/admin/DestinationCard";
import { getDestinations } from "./actions";
import { Destination } from "./schema";

export default function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; page_size?: string }>;
}) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [pageData, setPageData] = useState({
    pageCount: 0,
    pageIndex: 0,
    pageSize: 6,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Set default view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView("grid");
      } else {
        setView("list");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = await searchParams;
      const page = Number(params.page) || 1;
      const pageSize = Number(params.page_size) || 6;

      const paginatedData = await getDestinations(page, pageSize);

      setDestinations(paginatedData.items);
      setPageData({
        pageCount: paginatedData.total_pages,
        pageIndex: paginatedData.page - 1,
        pageSize: paginatedData.page_size,
      });
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Destinations</h1>
          <p className="text-sm text-black mt-1">
            Manage destination locations and highlights
          </p>
        </div>
        <div className="flex items-center gap-1 border border-gray-300 p-1">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 text-sm ${view === "list"
              ? "bg-black text-white"
              : "text-black hover:text-black hover:bg-gray-100"
              }`}
          >
            List
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 text-sm ${view === "grid"
              ? "bg-black text-white"
              : "text-black hover:text-black hover:bg-gray-100"
              }`}
          >
            Grid
          </button>
        </div>
      </div>

      {view === "list" ? (
        <DataTable
          data={destinations}
          columns={columns}
          pageCount={pageData.pageCount}
          pagination={{
            pageIndex: pageData.pageIndex,
            pageSize: pageData.pageSize,
          }}
          view={view}
          onViewChange={setView}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}
