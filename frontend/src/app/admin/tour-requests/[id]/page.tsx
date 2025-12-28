import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Mail, MapPin, Phone, User, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { tourRequestDb } from "@/lib/data/tour-requests";
import { RequestStatus } from "../types";
import { cn } from "@/lib/utils";

export default async function TourRequestDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const request = await tourRequestDb.getTourRequestById(params.id);

    if (!request) {
        notFound();
    }

    const { customItinerary } = request;

    const statusColors = {
        [RequestStatus.PENDING]: "bg-yellow-100 text-yellow-800",
        [RequestStatus.APPROVED]: "bg-green-100 text-green-800",
        [RequestStatus.REJECTED]: "bg-red-100 text-red-800",
        [RequestStatus.ARCHIVED]: "bg-gray-100 text-gray-800",
    };

    return (
        <div className="space-y-8 p-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin/tour-requests" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">Request Details</h1>
                    <p className="text-sm text-gray-500">ID: {request._id}</p>
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", statusColors[request.status])}>
                    {request.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Info Card */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-4">
                            Contact Information
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-gray-400 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Name</span>
                                    <span className="font-medium">{request.firstName} {request.lastName}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-gray-400 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Email</span>
                                    <a href={`mailto:${request.email}`} className="font-medium hover:text-amber-600 transition-colors">{request.email}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-gray-400 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Phone</span>
                                    <span className="font-medium">{request.phone || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-4">
                            Trip Summary
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Travel Date</span>
                                    <span className="font-medium">{request.travelDate}</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="w-4 h-4 text-gray-400 mt-1" />
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase">Travelers</span>
                                    <span className="font-medium">{request.travelers}</span>
                                </div>
                            </div>
                            {request.tourName && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                    <div>
                                        <span className="block text-xs text-gray-400 uppercase">Package / Type</span>
                                        <span className="font-medium text-amber-600">{request.tourName}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {request.message && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 shadow-sm">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-4">
                                Message
                            </h3>
                            <p className="text-sm italic text-gray-600 leading-relaxed">"{request.message}"</p>
                        </div>
                    )}
                </div>

                {/* Itinerary / Details */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    {customItinerary && customItinerary.length > 0 ? (
                        <div className="space-y-6">
                            <h3 className="text-lg font-light uppercase tracking-tight">Custom Itinerary</h3>
                            <div className="space-y-4">
                                {customItinerary.map((day) => (
                                    <div key={day.day} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                    {day.day}
                                                </span>
                                                <span className="font-bold text-sm uppercase">Day {day.day}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 font-mono">
                                                {day.items.length} Activities
                                            </div>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            {day.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                                                        {idx !== day.items.length - 1 && <div className="w-px h-full bg-gray-100 my-1" />}
                                                    </div>
                                                    <div className="flex-1 pb-4">
                                                        {item.type === "experience" ? (
                                                            <div className="bg-amber-50/50 border border-amber-100 rounded p-4">
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-1">
                                                                    Experience
                                                                </span>
                                                                <div className="text-sm font-bold uppercase">{item.experience?.title}</div>
                                                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                                                    <Clock className="w-3 h-3" /> {item.experience?.duration || "N/A"}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-blue-50/50 border border-blue-100 rounded p-4">
                                                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 block mb-1">
                                                                    Travel
                                                                </span>
                                                                <div className="text-sm font-bold uppercase flex items-center gap-2">
                                                                    {item.travel?.from} <span className="text-gray-400">→</span> {item.travel?.to}
                                                                </div>
                                                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                                                    <Clock className="w-3 h-3" /> {item.travel?.duration} Hours
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                            <p className="text-gray-400 uppercase tracking-widest text-sm">Standard Tour Request (No Custom Itinerary)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
