"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Clock, ArrowRightLeft } from "lucide-react";
import { Destination } from "@/app/(website)/destinations/schema";
import { getTravelTime } from "@/constants/travel-times";
import { Button } from "@/components/ui/button";

interface TravelSelectorProps {
    destinations: Destination[];
    onConfirm: (data: { from: string; to: string; duration: number }) => void;
    onCancel: () => void;
}

export function TravelSelector({ destinations, onConfirm, onCancel }: TravelSelectorProps) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (from && to) {
            const fromDest = destinations.find(d => d._id === from);
            const toDest = destinations.find(d => d._id === to);

            if (fromDest && toDest) {
                // Use clean names for lookup (e.g. "Thimphu" vs "Thimphu District")
                // Assuming names are roughly just the location. 
                // In a real app we might want clearer identifiers or normalize names.
                const cleanFrom = fromDest.name.split(" ")[0];
                const cleanTo = toDest.name.split(" ")[0];
                setDuration(getTravelTime(cleanFrom, cleanTo));
            }
        }
    }, [from, to, destinations]);

    const handleSubmit = () => {
        if (from && to) {
            const fromName = destinations.find(d => d._id === from)?.name || "";
            const toName = destinations.find(d => d._id === to)?.name || "";
            onConfirm({ from: fromName, to: toName, duration });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg space-y-6">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
                <ArrowRightLeft className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Add Travel Segment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Origin</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md appearance-none text-sm focus:outline-none focus:border-amber-600 transition-colors"
                        >
                            <option value="">Select Origin</option>
                            {destinations.map(d => (
                                <option key={d._id} value={d._id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Destination</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-md appearance-none text-sm focus:outline-none focus:border-amber-600 transition-colors"
                        >
                            <option value="">Select Destination</option>
                            {destinations.map(d => (
                                <option key={d._id} value={d._id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between bg-amber-50 p-4 rounded-md border border-amber-100">
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">Estimated Duration</span>
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        step="0.5"
                        value={duration}
                        onChange={(e) => setDuration(parseFloat(e.target.value))}
                        className="w-20 bg-white border border-amber-200 rounded px-2 py-1 text-right font-mono text-sm focus:outline-none focus:border-amber-600"
                    />
                    <span className="text-xs font-bold text-amber-800">HRS</span>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!from || !to}
                    className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-black transition-colors rounded-sm"
                >
                    Confirm Segment
                </button>
            </div>
        </div>
    );
}
