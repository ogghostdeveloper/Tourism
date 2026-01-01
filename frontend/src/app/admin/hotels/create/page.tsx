"use client";

import { HotelForm } from "../components/hotel-form";
import { createHotel } from "../actions";

export default function CreateHotelPage() {
  return (
    <HotelForm
      title="Create New Hotel"
      action={(id, prevState, formData) => createHotel(prevState, formData)}
    />
  );
}
