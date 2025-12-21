import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, MapPin, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Hotel } from "@/lib/data/packages";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      className="relative overflow-hidden bg-gray-900 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/admin/hotels/${hotel.id}`)}
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
        <div className="mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            {hotel.category}
          </span>
        </div>
        <h3 className="text-xl font-light text-white mb-2">{hotel.name}</h3>

        <div className="flex flex-wrap gap-2 mt-1">
          <div className="flex items-center gap-1.5 text-white/70">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-medium tracking-wide uppercase">
              {hotel.location}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 border-l border-white/20 pl-2">
            <DollarSign className="w-3 h-3" />
            <span className="text-[10px] font-medium tracking-wide uppercase">
              {hotel.pricePerNight}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 border-l border-white/20 pl-2">
            <Star className="w-3 h-3 fill-white/70" />
            <span className="text-[10px] font-medium tracking-wide uppercase">
              {hotel.rating} Stars
            </span>
          </div>
        </div>
      </div>

      {/* Hover Actions */}
      <motion.div
        className="absolute top-4 right-4 flex gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={`/admin/hotels/${hotel.id}/edit`}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            size="icon"
            className="bg-white text-black hover:bg-gray-100 w-9 h-9"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          size="icon"
          className="bg-red-500 text-white hover:bg-red-600 w-9 h-9"
          onClick={(e) => {
            e.stopPropagation();
            // Handle delete
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
