"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, LayoutGrid, List } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DestinationCard } from "@/app/admin/destinations/components/destination-card";
import { Pagination } from "@/components/admin/Pagination";

interface DestinationsClientProps {
    destinations: any[];
}

export function DestinationsClient({ destinations }: DestinationsClientProps) {
    const [view, setView] = useState<"list" | "grid">("list");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Set default view based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setView("grid");
            } else {
                setView("list"); // Reset to list if screen is larger
            }
        };

        // Set initial view
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(destinations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDestinations = destinations.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-black">Destinations</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage destination locations and highlights</p>
                </div>
                <Link href="/admin/destinations/create">
                    <Button className="bg-black text-white text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Destination
                    </Button>
                </Link>
            </div>

            {/* Filters and View Toggle */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search destinations..."
                        className="pl-10 border-gray-300"
                    />
                </div>

                <div className="flex items-center gap-1 border border-gray-300 p-1">
                    <Button
                        variant={view === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setView("list")}
                        className={view === "list" ? "bg-black text-white" : "text-gray-600 hover:text-black hover:bg-gray-100"}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={view === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setView("grid")}
                        className={view === "grid" ? "bg-black text-white" : "text-gray-600 hover:text-black hover:bg-gray-100"}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* List View */}
            {view === "list" && (
                <Card className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 border-b-2 border-gray-200 hover:bg-gray-50">
                                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs pl-6">Name</TableHead>
                                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs">Region</TableHead>
                                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs">Highlights</TableHead>
                                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedDestinations.map((dest) => (
                                <TableRow key={dest.slug} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 overflow-hidden bg-gray-100 border border-gray-200">
                                                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-black text-sm">{dest.name}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{dest.slug}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <span className="text-gray-700 font-medium text-sm">{dest.region}</span>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {dest.highlights.slice(0, 2).map((highlight: string, i: number) => (
                                                <span key={i} className="bg-gray-100 px-2.5 py-1 text-xs text-gray-700 font-medium border border-gray-200">
                                                    {highlight}
                                                </span>
                                            ))}
                                            {dest.highlights.length > 2 && (
                                                <span className="bg-gray-100 px-2.5 py-1 text-xs text-gray-700 font-medium border border-gray-200">
                                                    +{dest.highlights.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right pr-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/destinations/${dest.slug}`}>
                                                <Button variant="ghost" size="icon-sm" className="hover:bg-gray-100 text-gray-600 hover:text-black">
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon-sm" className="hover:bg-red-50 hover:text-red-600 text-gray-600">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="px-6 pb-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </Card>
            )}

            {/* Grid View */}
            {view === "grid" && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedDestinations.map((dest) => (
                            <DestinationCard key={dest.slug} destination={dest} />
                        ))}
                    </div>

                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
