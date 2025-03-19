import { Document } from "mongoose";

export interface IPreorder extends Document {
  reservationId: string;
  items: [
    { 
    menuItemId: string;
    quantity: number; 
    }
  ];
  totalAmount: number;
}