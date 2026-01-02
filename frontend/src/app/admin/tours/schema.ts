import { z } from "zod";

export const travelSchema = z.object({
    from: z.string(),
    to: z.string(),
});

export const itineraryItemSchema = z.object({
    type: z.enum(["experience", "travel"]),
    experienceId: z.string().optional(), // Link to an Experience entity
    travel: travelSchema.optional(),
    order: z.number(),
});

export const tourDaySchema = z.object({
    day: z.number(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(), // URL for the day's image
    hotelId: z.string().optional(), // Link to a Hotel entity for overnight stay
    items: z.array(itineraryItemSchema).default([]),
    // Legacy fields for backward compatibility/quick fallback
    accommodation: z.string().optional(),
    activities: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
});

export const tourSchema = z.object({
    _id: z.string().optional(),
    id: z.string().optional(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(), // Cover image URL
    duration: z.string(),
    price: z.preprocess((val) => {
        if (typeof val === 'string') {
            // Remove non-numeric chars except dot
            const cleaned = val.replace(/[^0-9.]/g, '');
            const num = parseFloat(cleaned);
            return isNaN(num) ? 0 : num;
        }
        if (typeof val === 'number') return val;
        return 0;
    }, z.number()),
    priority: z.preprocess((val) => {
        if (typeof val === 'string') {
            const num = parseFloat(val);
            return isNaN(num) ? 0 : num;
        }
        if (typeof val === 'number') return val;
        return 0;
    }, z.number().default(0)),
    category: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    days: z.array(tourDaySchema),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type Tour = z.infer<typeof tourSchema>;
export type TourDay = z.infer<typeof tourDaySchema>;
export type ItineraryItem = z.infer<typeof itineraryItemSchema>;
export type Travel = z.infer<typeof travelSchema>;

export interface PaginatedTours {
    items: Tour[];
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}
