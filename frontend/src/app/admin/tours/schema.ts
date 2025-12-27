import { z } from "zod";

export const experienceSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
    category: z.string().optional(),
});

export const tourDaySchema = z.object({
    day: z.number(),
    title: z.string(),
    description: z.string(),
    image: z.string().url().optional(),
    accommodation: z.string().optional(),
    activities: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    experiences: z.array(experienceSchema).optional(),
});

export const tourSchema = z.object({
    _id: z.string().optional(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string().url(),
    duration: z.string(),
    price: z.string(),
    featured: z.boolean().default(false),
    category: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    days: z.array(tourDaySchema),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Tour = z.infer<typeof tourSchema>;
export type TourDay = z.infer<typeof tourDaySchema>;
export type Experience = z.infer<typeof experienceSchema>;

export interface PaginatedTours {
    items: Tour[];
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}
