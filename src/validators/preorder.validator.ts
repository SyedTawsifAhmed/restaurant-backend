import { z } from "zod";

export const validatePreorder = z.object({
  reservationId: z.string(),
  items: z.array(z.object({ 
    menuItemId: z.string(), 
    quantity: z.number().
      int('Quantity must be an integer').
      positive('Quantity must be at least 1') 
  })),
});