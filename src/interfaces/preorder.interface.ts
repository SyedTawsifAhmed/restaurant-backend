import { Document } from "mongoose";
import { IMenuItem } from "./menuItem.interface";

interface IPreorderItem {
  menuItemId: IMenuItem;
  quantity: number;
}

export interface IPreorder extends Document {
  reservationId: string;
  paymentId: string;
  items: [IPreorderItem];
  totalAmount: number;
}