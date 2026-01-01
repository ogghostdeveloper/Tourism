"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Clock, MapPin, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tour } from "../schema";
import { Badge } from "@/components/ui/badge";
import { DeleteTourDialog } from "./delete-tour-dialog";

interface TourCardProps {
    tour: Tour;
    showActionsOnClick?: boolean;
}

export function TourCard({ tour, showActionsOnClick }: TourCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();

    return (
        <>
            <DeleteTourDialog
                tour={tour}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
            <motion.div
                className="relative overflow-hidden bg-white/5 border border-black/5 group cursor-pointer rounded-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push(`/admin/tours/${tour.slug}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Image */}
                <div className="aspect-video overflow-hidden relative">
                    <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Priority Badge if non-zero? Optional, for now just removing Featured */}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                                {tour.category || "General"}
                            </span>
                            <h3 className="text-lg font-light text-black line-clamp-1 group-hover:text-amber-600 transition-colors">
                                {tour.title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-amber-600">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tour.price)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hover Actions */}
                <motion.div
                    className="absolute top-2 right-2 flex gap-1.5"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{
                        opacity: isHovered || showActionsOnClick ? 1 : 0,
                        x: isHovered || showActionsOnClick ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <Link
                        href={`/admin/tours/${tour.slug}/edit`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button
                            size="icon"
                            variant="secondary"
                            className="bg-white/90 text-black hover:bg-white w-8 h-8 backdrop-blur-sm shadow-sm"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="destructive"
                        className="bg-red-500/90 text-white hover:bg-red-600 w-8 h-8 backdrop-blur-sm shadow-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteDialog(true);
                        }}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </motion.div>
            </motion.div>
        </>
    );
}
