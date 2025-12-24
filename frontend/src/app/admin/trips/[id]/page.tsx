"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  DollarSign,
  Check,
  X,
  Send,
  FileText,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getTripRequestById,
  updateTripRequestStatus,
  updateTripRequestProposal,
} from "@/lib/actions";
import { TripRequest } from "@/lib/data";

export default function TripRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [request, setRequest] = useState<TripRequest | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState("");
  const [sendingProposal, setSendingProposal] = useState(false);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    setLoading(true);
    try {
      const data = await getTripRequestById(id);
      setRequest(data);
      if (data?.adminProposal) {
        setProposal(data.adminProposal);
      }
    } catch (error) {
      console.error("Failed to fetch request", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: TripRequest["status"]) => {
    if (!request) return;
    try {
      setRequest({ ...request, status });
      await updateTripRequestStatus(request.id, status);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleSendProposal = async () => {
    if (!request) return;
    setSendingProposal(true);
    try {
      await updateTripRequestProposal(request.id, proposal);
      setRequest({ ...request, status: "Proposed", adminProposal: proposal });
      // Simulating email send
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to send proposal", error);
    } finally {
      setSendingProposal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Proposed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">Loading details...</div>
    );
  }

  if (!request) {
    return (
      <div className="p-12 text-center text-gray-500">
        Trip request not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/trips">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-light text-black flex items-center gap-3">
              Trip Request #{request.id.split("-").pop()}
              <span
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded-full border uppercase tracking-wider",
                  getStatusColor(request.status)
                )}
              >
                {request.status}
              </span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Submitted on {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Trip Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Trip Details
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Type
                </span>
                <span className="text-sm font-medium">{request.type}</span>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Travelers
                </span>
                <span className="text-sm font-medium">
                  {request.numberOfTravelers} People
                </span>
              </div>
            </div>

            {request.type === "Prepackaged" ? (
              <div className="p-4 bg-gray-50 rounded border border-gray-100 mb-6">
                <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Package Selected
                </span>
                <div className="font-medium text-lg">{request.packageName}</div>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    Desired Destination(s)
                  </span>
                  <div className="text-base">{request.destination}</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {request.budget && (
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Budget
                      </span>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span>{request.budget}</span>
                      </div>
                    </div>
                  )}
                  {request.interests && (
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Interests
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {request.interests.map((i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                          >
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-gray-100 pt-6">
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Date Preference
              </span>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                {request.startDate ? (
                  <>
                    {new Date(request.startDate).toLocaleDateString()}
                    {request.endDate &&
                      ` - ${new Date(request.endDate).toLocaleDateString()}`}
                  </>
                ) : (
                  "Flexible Dates"
                )}
              </div>
            </div>

            {request.notes && (
              <div className="border-t border-gray-100 pt-6 mt-6">
                <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                  Additional Notes
                </span>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{request.notes}"
                </p>
              </div>
            )}
          </div>

          {/* Customization / Proposal Section */}
          {request.type === "Custom" && (
            <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                Plan Customization & Feedback
              </h2>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Proposal / Itinerary Feedback
                </label>
                <textarea
                  className="w-full min-h-[150px] p-3 border border-gray-300 rounded focus:ring-1 focus:ring-black focus:border-black outline-none text-sm"
                  placeholder="Draft your proposal or feedback for the user here..."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                />
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-400">
                    This will be sent as an email notification to the user.
                  </span>
                  <Button
                    onClick={handleSendProposal}
                    disabled={sendingProposal || !proposal.trim()}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    {sendingProposal ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Proposal
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - User Info & Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              User Information
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">{request.userName}</div>
                <div className="text-xs text-gray-500">{request.userEmail}</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> User Location: Unknown (IP)
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Actions
            </h3>
            {request.status === "Pending" ? (
              <div className="space-y-3">
                <Button
                  onClick={() => handleStatusUpdate("Accepted")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="w-4 h-4 mr-2" /> Accept Request
                </Button>
                <Button
                  onClick={() => handleStatusUpdate("Rejected")}
                  variant="destructive"
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" /> Reject Request
                </Button>
              </div>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">
                  Request is currently
                </p>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase",
                    getStatusColor(request.status)
                  )}
                >
                  {request.status}
                </span>
                {request.status !== "Rejected" && (
                  <Button
                    onClick={() => handleStatusUpdate("Rejected")}
                    variant="ghost"
                    size="sm"
                    className="mt-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Rewrite to Rejected
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
