import { Document } from "mongoose";

export interface IReservation extends Document {
  name: string;
  email: string;
  phone: string;
  guestCount: number;
  specialRequest: string | null;
  reservationTime: Date;
  tables: [string];
  parking: boolean;
  preOrderId: string | null;
  reservationCode: string;  
}