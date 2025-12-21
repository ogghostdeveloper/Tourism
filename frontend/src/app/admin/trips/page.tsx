"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Check, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTripRequests, updateTripRequestStatus } from "@/lib/actions";
import { TripRequest } from "@/lib/data";

export default function TripRequestsPage() {
  const [requests, setRequests] = useState<TripRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getTripRequests();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    status: TripRequest["status"]
  ) => {
    try {
      // Optimistic update
      setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)));
      await updateTripRequestStatus(id, status);
    } catch (error) {
      console.error("Failed to update status", error);
      // Revert on error - re-fetch would be safer but simple revert for now
      fetchRequests();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Proposed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading requests...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-light text-black">Trip Requests</h1>
        <div className="text-sm text-gray-500">
          {requests.length} Requests Found
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                User
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Type
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Request
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Dates
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="p-4 text-sm font-mono text-gray-500">
                  #{request.id.split("-").pop()}
                </td>
                <td className="p-4">
                  <div className="font-medium text-black">
                    {request.userName}
                  </div>
                  <div className="text-xs text-gray-400">
                    {request.userEmail}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full border",
                      request.type === "Custom"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    )}
                  >
                    {request.type}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {request.packageName || request.destination || "Custom Trip"}
                  <div className="text-xs text-gray-400 mt-1">
                    {request.numberOfTravelers} travelers
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {request.startDate ? (
                    <>
                      {new Date(request.startDate).toLocaleDateString()}
                      {request.endDate &&
                        ` - ${new Date(request.endDate).toLocaleDateString()}`}
                    </>
                  ) : (
                    "Not specified"
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={cn(
                      "px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm",
                      getStatusColor(request.status)
                    )}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/trips/${request.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4 text-gray-500" />
                      </Button>
                    </Link>
                    {request.status === "Pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusUpdate(request.id, "Accepted")
                          }
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                          title="Accept"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() =>
                            handleStatusUpdate(request.id, "Rejected")
                          }
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center">
            <FileText className="w-12 h-12 mb-4 opacity-20" />
            <p>No trip requests found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
