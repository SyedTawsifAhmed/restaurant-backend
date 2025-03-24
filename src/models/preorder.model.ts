import { Schema, model } from "mongoose";
import { IPreorder } from "@/interfaces/preorder.interface";

const preOrderItemSchema: Schema = new Schema(
  {
    menuItemId: {
      type: Schema.Types.ObjectId, 
      required: true,
      ref: 'MenuItem',
    },
    quantity: { type: Number, required: true, min: 1},
  },
  {
    _id: false, // We don't need a separate ID for each item
  }
);

const preOrderSchema = new Schema<IPreorder>(
  {
    reservationId: { type: String, required: true },
    items: { type: [preOrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const PreOrder = model<IPreorder>("PreOrder", preOrderSchema);

export default PreOrder;