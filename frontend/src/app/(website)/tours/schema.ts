import { z } from "zod";

// Experience schema for day activities
export const experienceSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  category: z.string().optional(),
});

// Tour day schema
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

// Main tour schema
export const tourSchema = z.object({
  id: z.string(),
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
});

// Export TypeScript types
export type Experience = z.infer<typeof experienceSchema>;
export type TourDay = z.infer<typeof tourDaySchema>;
export type Tour = z.infer<typeof tourSchema>;
