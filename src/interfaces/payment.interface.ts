import { Document } from "mongoose";

export interface IPayment extends Document {
  preorderId: string;
  amount: number;
  paymentMethod: 'stripe';
  paymentMethodId: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
}