import { z } from "zod";

export const experienceTypeSchema = z.object({
    _id: z.string().optional(),
    id: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image is required"),
    displayOrder: z.number().default(0),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export type ExperienceType = z.infer<typeof experienceTypeSchema>;

export interface PaginatedExperienceTypes {
    items: ExperienceType[];
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}
