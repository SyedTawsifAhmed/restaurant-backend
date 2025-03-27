import { z } from "zod";

export const validateRefund = z.object({
  paymentId: z.string(),
  preorderId: z.string(),
  refundReason: z.string().optional(),
});