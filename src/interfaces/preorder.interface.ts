import { Document } from "mongoose";

interface IPreOrderItem {
  menuItemId: string;
  quantity: number;
}

export interface IPreorder extends Document {
  reservationId: string;
  items: [IPreOrderItem];
  totalAmount: number;
}