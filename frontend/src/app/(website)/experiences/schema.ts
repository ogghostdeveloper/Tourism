import { z } from "zod";

export const experienceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string(),
  duration: z.string().optional(),
  difficulty: z.enum(["Easy", "Moderate", "Challenging"]).optional(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
  destinationSlug: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

export type Experience = z.infer<typeof experienceSchema>;
