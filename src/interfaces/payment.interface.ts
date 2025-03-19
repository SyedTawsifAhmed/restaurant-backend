import { Document } from "mongoose";

export interface IPayment extends Document {
  reservationId: string;
  amount: number;
  paymentMethod: 'stripe';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
}