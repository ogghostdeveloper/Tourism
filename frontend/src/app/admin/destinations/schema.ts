import { z } from "zod";

export const destinationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  region: z.string(),
  highlights: z.array(z.string()),
  coordinates: z.tuple([z.number(), z.number()]),
  experiences: z.array(z.string()).optional(),
  hotels: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Destination = z.infer<typeof destinationSchema>;

export interface PaginatedDestinations {
  items: Destination[];
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
