"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getDestinations } from "./actions";
import { Destination } from "./schema";
interface DestinationsPageProps {
  searchParams: Promise<{ page?: string; page_size?: string }>;
}

export default function DestinationsPage({ searchParams }: DestinationsPageProps) {
  // Always default to 'list' on the server to avoid hydration mismatch
  const [view, setView] = useState<"list" | "grid">("list");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [pageData, setPageData] = useState({
    pageCount: 0,
    pageIndex: 0,
    pageSize: 6,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Set view after mount to avoid hydration mismatch
  useEffect(() => {
    const setInitialView = () => {
      if (window.innerWidth < 768) {
        setView("grid");
      } else {
        const stored = window.localStorage.getItem("destinations_view");
        setView(stored === "list" || stored === "grid" ? stored : "list");
      }
    };
    setInitialView();
    window.addEventListener("resize", setInitialView);
    return () => window.removeEventListener("resize", setInitialView);
  }, []);

  // Persist view changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("destinations_view", view);
    }
  }, [view]);

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
      <div>
        <h1 className="text-2xl font-semibold text-black">Destinations</h1>
        <p className="text-sm text-black mt-1">
          Manage destination locations and highlights
        </p>
      </div>
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
    </div>
  );
}
