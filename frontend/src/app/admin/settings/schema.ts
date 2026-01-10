
import { z } from "zod";

export const costSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price must be a positive number"),
    isActive: z.boolean().default(true),
});

export type Cost = z.infer<typeof costSchema> & {
    id?: string;
    _id?: string;
};
