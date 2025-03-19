import { Document } from "mongoose";

export interface IPayment extends Document {
  reservationId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}