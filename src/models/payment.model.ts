import { Schema, model } from "mongoose";
import { IPayment } from "@/interfaces/payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    reservationId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['stripe'], required: true },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'completed', 'failed', 'refunded'],
      required: true }
  },
  { timestamps: true }
);

const Payment = model<IPayment>("Payment", paymentSchema);

export default Payment;