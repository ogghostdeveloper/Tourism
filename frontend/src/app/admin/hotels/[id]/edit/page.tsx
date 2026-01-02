"use client";

import * as React from "react";
import { use } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { HotelForm } from "../../components/hotel-form";
import { getHotelById, updateHotel } from "../../actions";
import { Hotel } from "../../schema";

export default function EditHotelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [hotel, setHotel] = React.useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHotelById(id);
        if (data) {
          setHotel(data);
        }
      } catch (error) {
        toast.error("Failed to fetch hotel data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Hotel not found</p>
      </div>
    );
  }

  return (
    <HotelForm
      title={`Edit Hotel: ${hotel.name}`}
      initialData={hotel}
      action={(formData) => updateHotel(id, null, formData)}
    />
  );
}
