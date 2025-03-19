import { Schema, model } from "mongoose";
import { IMenuItem } from "@/interfaces/menuItem.interface";

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const MenuItem = model<IMenuItem>("MenuItem", menuItemSchema);  

export default MenuItem;

