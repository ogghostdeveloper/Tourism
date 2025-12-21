import { z } from "zod";

export const hotelSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  image: z.string(),
  rating: z.number().min(1).max(5),
  amenities: z.array(z.string()),
  priceRange: z.string(),
  rooms: z.number(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Hotel = z.infer<typeof hotelSchema>;

export interface PaginatedHotels {
  items: Hotel[];
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
