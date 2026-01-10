"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, MapPin, Star, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Hotel } from "../schema";
import { Badge } from "@/components/ui/badge";
import { DeleteHotelDialog } from "./delete-hotel-dialog";

interface HotelCardProps {
    hotel: Hotel;
    showActionsOnClick?: boolean;
}

export function HotelCard({ hotel, showActionsOnClick }: HotelCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();

    return (
        <>
            <DeleteHotelDialog
                hotel={hotel}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
            <motion.div
                className="relative overflow-hidden bg-gray-900 group cursor-pointer rounded-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push(`/admin/hotels/${hotel.id || hotel._id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Image */}
                <div className="aspect-4/3 overflow-hidden">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <div className="flex gap-4 items-center mb-2">
                        <h3 className="text-xl font-light text-white line-clamp-1">
                            {hotel.name}
                        </h3>
                        <Badge className="bg-white/90 text-black hover:bg-white border-none ">
                            {hotel.priceRange}
                        </Badge>
                    </div>


                    <div className="flex items-center gap-4 text-xs text-gray-300">
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{hotel.rating}</span>
                        </div>
                        {hotel.rooms && (
                            <div className="flex items-center gap-1">
                                <Bed className="w-3 h-3" />
                                <span>{hotel.rooms} Rooms</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{hotel.location}</span>
                        </div>
                    </div>
                </div>

                {/* Hover Actions */}
                <motion.div
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: isHovered || showActionsOnClick ? 1 : 0, y: isHovered || showActionsOnClick ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        href={`/admin/hotels/${hotel.id || hotel._id}/edit`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button
                            size="icon"
                            className="bg-amber-600 text-white hover:bg-amber-700 w-9 h-9"
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        className="bg-red-500 text-white hover:bg-red-600 w-9 h-9"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteDialog(true);
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </motion.div>
            </motion.div>
        </>
    );
}
