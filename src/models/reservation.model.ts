import { Schema, model } from "mongoose";
import { IReservation } from "@/interfaces/reservation.interface";

const reservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guestCount: { type: Number, required: true },
    specialRequest: { type: String, required: false },
    reservationTime: { type: Date, required: true },
    tables: { type: [String], required: false },
    parking: { type: Boolean, required: true },
    preOrderId: { type: String, required: false },
    reservationCode: { type: String, required: true },
  },
  { timestamps: true }
);

const Reservation = model<IReservation>("Reservation", reservationSchema);

export default Reservation;