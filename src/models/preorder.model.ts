import { Schema, model } from "mongoose";
import { IPreorder } from "@/interfaces/preorder.interface";

const preorderItemSchema: Schema = new Schema(
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

const preorderSchema = new Schema<IPreorder>(
  {
    reservationId: { type: String, required: true },
    paymentId: { type: String, required: true },
    items: { type: [preorderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Preorder = model<IPreorder>("PreOrder", preorderSchema);

export default Preorder;