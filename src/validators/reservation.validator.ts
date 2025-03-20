import { z } from "zod";

export const validateReservation = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email(),
  phone: z.string(),
  guestCount: z.string().min(1, "Guest count is required"),
  specialRequest: z.
    string().
    max(200, "Special request is too long").
    default(""),
  reservationTime: z.date(),
  parking: z.boolean().default(false),
});