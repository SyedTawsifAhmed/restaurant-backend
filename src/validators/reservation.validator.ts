import { z } from "zod";

export const validateReservation = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email(),
  phone: z.string(), // Need to decide on country
  guestCount: z.
    number().
    int().
    positive("Guest count must be at least 1").
    default(1),
  specialRequest: z.
    string().
    max(200, "Special request is too long").
    default(""),
  reservationTime: z.date(),
  parking: z.boolean().default(false),
});