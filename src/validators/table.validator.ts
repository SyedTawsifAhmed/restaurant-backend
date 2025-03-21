import { z } from "zod";

export const validateTable = z.object({
  number: z.number().int().positive("Table number must be positive"),
  seats: z.number().int().positive("Number of seats must be positive"),
  available: z.boolean(), 
});