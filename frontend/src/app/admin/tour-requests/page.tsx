"use client";

import { useState, useEffect } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getTourRequests } from "./actions";
import { TourRequest } from "./types";

interface TourRequestsPageProps {
  searchParams: Promise<{ page?: string; page_size?: string }>;
}

export default function TourRequestsPage({
  searchParams,
}: TourRequestsPageProps) {
  // Always default to 'list' on the server to avoid hydration mismatch
  const [view, setView] = useState<"list" | "grid">("list");
  const [requests, setRequests] = useState<TourRequest[]>([]);
  const [pageData, setPageData] = useState({
    pageCount: 0,
    pageIndex: 0,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Set view after mount to avoid hydration mismatch
  useEffect(() => {
    const setInitialView = () => {
      if (window.innerWidth < 768) {
        setView("grid");
      } else {
        const stored = window.localStorage.getItem("tour_requests_view");
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
      window.localStorage.setItem("tour_requests_view", view);
    }
  }, [view]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const params = await searchParams;
      const page = Number(params.page) || 1;
      const pageSize = Number(params.page_size) || 10;

      const paginatedData = await getTourRequests(page, pageSize);

      setRequests(paginatedData.items as TourRequest[]);
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
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Tour Requests
          </h2>
          <p className="text-black text-sm">
            Manage incoming traveler inquiries and luxury package requests.
          </p>
        </div>
      </div>
      <DataTable
        data={requests}
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
