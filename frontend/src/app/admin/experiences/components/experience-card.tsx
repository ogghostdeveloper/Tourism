"use client";

import { Experience } from "../schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, MapPin, Clock, BarChart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps {
    experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-200">
            <Link href={`/admin/experiences/${experience.slug}`} className="block">
                <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={experience.image}
                            alt={experience.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                        <div className="absolute top-2 right-2">
                            <Badge className="bg-white/90 text-black hover:bg-white border-none shadow-sm capitalize">
                                {experience.category}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Link>
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <Link href={`/admin/experiences/${experience.slug}`} className="block">
                        <h3 className="font-semibold text-lg text-black group-hover:text-amber-600 transition-colors line-clamp-1">
                            {experience.title}
                        </h3>
                    </Link>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                    {experience.duration && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>{experience.duration}</span>
                        </div>
                    )}
                    {experience.difficulty && (
                        <div className="flex items-center gap-1.5">
                            <BarChart className="w-4 h-4 text-amber-600" />
                            <span>{experience.difficulty}</span>
                        </div>
                    )}
                </div>

                {experience.destinationSlug && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        <span className="capitalize">{experience.destinationSlug.replace(/-/g, ' ')}</span>
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end">
                <Link href={`/admin/experiences/${experience.slug}/edit`}>
                    <Button
                        size="sm"
                        className="bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
