import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface DestinationCardProps {
  destination: {
    slug: string;
    name: string;
    region: string;
    image: string;
  };
  showActionsOnClick?: boolean;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      className="relative overflow-hidden bg-gray-900 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/admin/destinations/${destination.slug}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
        <div className="mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            {destination.region}
          </span>
        </div>
        <h3 className="text-xl font-light text-white mb-2">
          {destination.name}
        </h3>

      </div>

      {/* Hover Actions */}
      <motion.div
        className="absolute top-4 right-4 flex gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          href={`/admin/destinations/${destination.slug}/edit`}
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
