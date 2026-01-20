"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, X, Check, Hotel as HotelIcon } from "lucide-react";

interface Hotel {
    _id?: string;
    name: string;
    image: string;
    destinationSlug?: string;
    [key: string]: any;
}

interface HotelSelectorProps {
    hotels: Hotel[];
    onSelect: (hotel: Hotel) => void;
    onClose: () => void;
}

export function HotelSelector({ hotels, onSelect, onClose }: HotelSelectorProps) {
    const [search, setSearch] = useState("");

    const filtered = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-neutral-50 w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white z-10">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 block mb-2">
                            // accommodation
                        </span>
                        <h2 className="text-3xl font-light tracking-tight uppercase">Select Hotel</h2>
                        <p className="text-xs text-gray-500 mt-1">Only one hotel per day allowed</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 bg-white border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search hotels..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 placeholder:text-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((hotel) => (
                            <div
                                key={hotel._id}
                                className="relative group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-amber-600 transition-colors"
                                onClick={() => onSelect(hotel)}
                            >
                                {/* Hotel Image */}
                                <div className="aspect-4/3 relative overflow-hidden bg-gray-100">
                                    {hotel.image && (
                                        <img
                                            src={hotel.image}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    {!hotel.image && (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <HotelIcon className="w-12 h-12 text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Hotel Info */}
                                <div className="p-4">
                                    <h3 className="font-bold text-sm uppercase tracking-tight line-clamp-1">
                                        {hotel.name}
                                    </h3>
                                    {hotel.destinationSlug && (
                                        <p className="text-xs text-gray-500 mt-1 capitalize">
                                            {hotel.destinationSlug.replace(/-/g, ' ')}
                                        </p>
                                    )}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <span className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <Check className="w-4 h-4" /> add hotel
                                    </span>
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="col-span-full py-24 text-center text-gray-400">
                                <p className="text-sm uppercase tracking-widest">No hotels found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
