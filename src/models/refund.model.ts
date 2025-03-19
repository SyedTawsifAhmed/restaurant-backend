import { Schema, model } from "mongoose";
import { IRefund } from "@/interfaces/refund.interface";

const refundSchema = new Schema<IRefund>(
  {
    reservationId: { type: String, required: true },
    paymentId: { type: String, required: true },
    refundStatus: { 
      type: String, 
      enum: ["pending", "completed", "failed"], 
      required: true 
    },
    refundReason: { type: String, required: false },
  },
  { timestamps: true }
);

const Refund = model<IRefund>("Refund", refundSchema);

export default Refund;