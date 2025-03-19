import { Document } from "mongoose";

export interface IRefund extends Document {
  reservationId: string;
  paymentId: string;
  refundStatus: string;
  refundReason: string | null;
}