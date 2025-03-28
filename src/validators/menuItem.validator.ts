import { z } from "zod";

export const validateMenuItem = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .min(0, "Price must be at least 0"),
  category: z.string().min(1, "Category is required"),
});