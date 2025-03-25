import { Document } from "mongoose";

export interface IRefund extends Document {
  preOrderId: string;
  paymentId: string;
  refundStatus: string;
  refundReason: string | null;
}