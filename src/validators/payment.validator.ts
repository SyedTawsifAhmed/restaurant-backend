import { z } from "zod";

export const validateFilter = z.object({
  query: z.enum(["lt", "gt", "eq"]),
  value: z.union([z.number(), z.date()]),
})

export const validateStatus = z.object({
  status: z.enum(["pending", "completed", "failed", "refunded"]),
})