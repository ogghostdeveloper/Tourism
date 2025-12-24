"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  LayoutGrid,
  List,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";
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
import { Card } from "@/components/ui/card";
import { HotelCard } from "@/components/admin/HotelCard";
import { Pagination } from "@/components/admin/Pagination";
import { Hotel } from "@/app/(website)/hotels/schema";

interface HotelsClientProps {
  hotels: Hotel[];
}

export function HotelsClient({ hotels }: HotelsClientProps) {
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

  const totalPages = Math.ceil(hotels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHotels = hotels.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Hotels</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage accommodation options and properties
          </p>
        </div>
        <Link href="/admin/hotels/new">
          <Button className="bg-black text-white text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Hotel
          </Button>
        </Link>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search hotels..."
            className="pl-10 border-gray-300"
          />
        </div>

        <div className="flex items-center gap-1 border border-gray-300 p-1">
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("list")}
            className={
              view === "list"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("grid")}
            className={
              view === "grid"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }
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
                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs pl-6">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs">
                  Location
                </TableHead>
                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs">
                  Price
                </TableHead>
                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs">
                  Rating
                </TableHead>
                <TableHead className="font-semibold text-gray-700 uppercase tracking-wide text-xs text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedHotels.map((hotel) => (
                <TableRow
                  key={hotel.id}
                  className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-black text-sm">
                          {hotel.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">
                        {hotel.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="bg-gray-100 px-2.5 py-1 text-xs text-gray-700 font-medium border border-gray-200">
                      {hotel.destinationSlug}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">
                        {hotel.priceRange}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="text-sm font-medium">
                        {hotel.rating}
                      </span>
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/hotels/${hotel.id}`}>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="hover:bg-gray-100 text-gray-600 hover:text-black"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="hover:bg-red-50 hover:text-red-600 text-gray-600"
                      >
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
            {paginatedHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
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
