"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, MapPin, Clock, BarChart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Experience } from "../schema";
import { Badge } from "@/components/ui/badge";
import { DeleteExperienceDialog } from "./delete-experience-dialog";

interface ExperienceCardProps {
    experience: Experience;
    showActionsOnClick?: boolean;
}

export function ExperienceCard({ experience, showActionsOnClick }: ExperienceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();

    return (
        <>
            <DeleteExperienceDialog
                experience={experience}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />
            <motion.div
                className="relative overflow-hidden bg-gray-900 group cursor-pointer rounded-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => router.push(`/admin/experiences/${experience._id}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Image */}
                <div className="aspect-4/3 overflow-hidden">
                    <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <div className="flex justify-between items-end mb-2">
                        {experience.destinationSlug && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                                {experience.destinationSlug.replace(/-/g, ' ')}
                            </span>
                        )}
                        <Badge className="bg-white/90 text-black hover:bg-white border-none shadow-sm h-5 text-[10px] px-1.5 capitalize">
                            {experience.category}
                        </Badge>
                    </div>

                    <h3 className="text-xl font-light text-white mb-2 line-clamp-1">
                        {experience.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-gray-300">
                        {experience.duration && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{experience.duration}</span>
                            </div>
                        )}
                        {experience.difficulty && (
                            <div className="flex items-center gap-1">
                                <BarChart className="w-3 h-3" />
                                <span>{experience.difficulty}</span>
                            </div>
                        )}
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
                        href={`/admin/experiences/${experience._id}/edit`}
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
