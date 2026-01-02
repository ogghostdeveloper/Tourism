"use client";

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { format, isValid } from "date-fns";
import { ArrowLeft, Calendar, Clock, Mail, MapPin, Phone, User, CheckCircle2, XCircle, Archive, Trash2, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RequestStatus, TourRequest } from "../types";
import { updateTourRequestStatus, getTourRequestById } from "../actions";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DeleteTourRequestDialog } from "../components/delete-tour-request-dialog";

const formatDate = (dateStr: string | any, formatStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (!isValid(date)) return "N/A";
    return format(date, formatStr);
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function TourRequestDetailPage({ params }: PageProps) {
    const [request, setRequest] = useState<TourRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const resolvedParams = await params;
            const data = await getTourRequestById(resolvedParams.id);
            if (!data) {
                notFound();
                return;
            }
            setRequest(data as TourRequest);
            setIsLoading(false);
        };
        fetchData();
    }, [params]);

    const onStatusUpdate = async (status: RequestStatus) => {
        if (!request) return;
        const res = await updateTourRequestStatus(request._id!, status);
        if (res.success) {
            toast.success(`Request ${status} successfully`);
            // Refresh local state
            setRequest({ ...request, status });
        } else {
            toast.error(`Failed to update status: ${res.error}`);
        }
    };

    const copyEmail = () => {
        if (!request) return;
        navigator.clipboard.writeText(request.email);
        toast.success("Email copied to clipboard");
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading request details...</div>;
    }

    if (!request) return null;

    const { customItinerary } = request;

    const statusConfig = {
        [RequestStatus.PENDING]: {
            label: "Pending",
            color: "bg-amber-100 text-amber-700 border-amber-200",
        },
        [RequestStatus.APPROVED]: {
            label: "Approved",
            color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        },
        [RequestStatus.REJECTED]: {
            label: "Rejected",
            color: "bg-rose-100 text-rose-700 border-rose-200",
        },
        [RequestStatus.ARCHIVED]: {
            label: "Archived",
            color: "bg-gray-100 text-gray-700 border-gray-200",
        },
    };

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto pb-24">
            <DeleteTourRequestDialog
                request={request}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-8">
                <div className="flex items-center gap-6">
                    <Link href="/admin/tour-requests">
                        <Button variant="outline" size="icon" className="rounded-none shadow-sm border-gray-200">
                            <ArrowLeft className="w-4 h-4 text-black" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-semibold tracking-tight text-black">
                                {request.firstName} {request.lastName}
                            </h1>
                            <Badge variant="outline" className={cn("uppercase text-[10px] font-bold tracking-widest px-3 py-1 rounded-none", statusConfig[request.status].color)}>
                                {request.status}
                            </Badge>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Request ID: {request._id}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                    {request.status !== RequestStatus.APPROVED && (
                        <Button
                            onClick={() => onStatusUpdate(RequestStatus.APPROVED)}
                            className="bg-black text-white hover:bg-gray-800 rounded-none shadow-sm px-6"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </Button>
                    )}
                    {request.status !== RequestStatus.REJECTED && (
                        <Button
                            variant="outline"
                            onClick={() => onStatusUpdate(RequestStatus.REJECTED)}
                            className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none px-6"
                        >
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                    )}
                    {request.status !== RequestStatus.ARCHIVED && (
                        <Button
                            variant="outline"
                            onClick={() => onStatusUpdate(RequestStatus.ARCHIVED)}
                            className="text-gray-400 border-gray-200 rounded-none"
                        >
                            <Archive className="mr-2 h-4 w-4" /> Archive
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-none"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Information Column */}
                <div className="lg:col-span-1 space-y-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                            Contact Details
                        </h3>

                        <div className="space-y-6">
                            <div className="group relative">
                                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Email</span>
                                <div className="flex items-center justify-between">
                                    <a href={`mailto:${request.email}`} className="text-black font-semibold hover:text-amber-600 transition-colors break-all text-sm underline decoration-gray-200 underline-offset-4">
                                        {request.email}
                                    </a>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:text-black" onClick={copyEmail}>
                                        <Copy className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                            <div className="group relative">
                                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone</span>
                                <span className="text-black font-semibold text-sm">{request.phone || "Not Provided"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Request Details */}
                    <div className="space-y-8 pt-8 border-t border-gray-50">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                            Plan Details
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Travel Date</span>
                                <span className="text-black font-semibold flex items-center gap-2 text-sm">
                                    {formatDate(request.travelDate, "EEEE, MMM dd, yyyy")}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Group Size</span>
                                <span className="text-black font-semibold text-sm">{request.travelers} Travelers</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Package Interest</span>
                                <span className="text-amber-600 font-bold block uppercase tracking-tight text-sm">
                                    {request.tourName || request.destination || "Custom Luxe Experience"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    {request.message && (
                        <div className="space-y-6 pt-8 border-t border-gray-50">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                                Message
                            </h3>
                            <div className="relative">
                                <span className="absolute -top-4 -left-2 text-4xl font-serif text-gray-100 italic select-none">"</span>
                                <p className="text-sm text-gray-500 leading-relaxed italic relative z-10 pl-4">{request.message}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Itinerary Column */}
                <div className="lg:col-span-3 space-y-8">
                    {customItinerary && customItinerary.length > 0 ? (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                <h3 className="text-2xl font-semibold text-black tracking-tight">Custom Itinerary</h3>
                                <Badge variant="outline" className="rounded-none border-gray-200 text-zinc-400 text-[10px] uppercase font-bold tracking-widest">
                                    {customItinerary.length} Days
                                </Badge>
                            </div>
                            <div className="space-y-16">
                                {customItinerary.map((day) => (
                                    <div key={day.day} className="relative group">
                                        <div className="flex gap-12">
                                            <div className="flex flex-col items-center">
                                                <div className="w-12 h-12 border border-black text-black flex items-center justify-center font-bold text-sm bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] mb-4">
                                                    {day.day < 10 ? `0${day.day}` : day.day}
                                                </div>
                                                <div className="w-px h-full bg-gray-100 flex-1" />
                                            </div>

                                            <div className="flex-1 space-y-8 pb-12">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-bold uppercase tracking-widest text-black">Day {day.day}</h4>
                                                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{day.items.length} Activities</span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {day.items.map((item, idx) => (
                                                        <div key={idx} className="relative group/item overflow-hidden">
                                                            {item.type === "experience" ? (
                                                                <div className="border border-gray-100 p-6 bg-white hover:border-amber-200 transition-colors rounded-none shadow-xs">
                                                                    <div className="flex justify-between items-start mb-4">
                                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 block">
                                                                            Experience
                                                                        </span>
                                                                        <Clock className="w-3 h-3 text-gray-300" />
                                                                    </div>
                                                                    <div className="text-sm font-bold text-black uppercase tracking-tight mb-2">{item.experience?.title}</div>
                                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                                        {item.experience?.duration || "Duration N/A"}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="border border-gray-100 p-6 bg-white hover:border-blue-200 transition-colors rounded-none shadow-xs">
                                                                    <div className="flex justify-between items-start mb-4">
                                                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 block">
                                                                            Transfer
                                                                        </span>
                                                                        <MapPin className="w-3 h-3 text-gray-300" />
                                                                    </div>
                                                                    <div className="text-sm font-bold text-black uppercase tracking-tight mb-2 flex items-center gap-3">
                                                                        {item.travel?.from} <span className="text-gray-200">→</span> {item.travel?.to}
                                                                    </div>
                                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                                        {item.travel?.duration} Hours
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="border border-gray-100 rounded-none p-32 text-center bg-gray-50/30">
                            <div className="w-16 h-16 bg-white border border-gray-100 rounded-none flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <MapPin className="w-6 h-6 text-gray-200" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Standard Inquiry</p>
                                <p className="text-gray-400 text-xs italic max-w-xs mx-auto">This traveler has requested information for a curated package or general inquiry.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

