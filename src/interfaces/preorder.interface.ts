import { Document } from "mongoose";
import { IMenuItem } from "./menuItem.interface";

interface IPreOrderItem {
  menuItemId: IMenuItem;
  quantity: number;
}

export interface IPreorder extends Document {
  reservationId: string;
  paymentId: string;
  items: [IPreOrderItem];
  totalAmount: number;
}