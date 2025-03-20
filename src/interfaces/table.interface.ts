import { Document } from "mongoose";

export interface ITable extends Document {
  number: number;
  available: boolean;
}