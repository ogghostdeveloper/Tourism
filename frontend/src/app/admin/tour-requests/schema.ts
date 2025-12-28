
import { z } from "zod";

export const tourRequestSchema = z.object({
    status: z.enum(["pending", "approved", "rejected", "archived"]),
});

export type TourRequestSchema = z.infer<typeof tourRequestSchema>;
