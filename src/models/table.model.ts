import { Schema, model } from "mongoose";
import { ITable } from "@/interfaces/table.interface";

const tableSchema = new Schema<ITable>(
  {
    number: { type: Number, required: true, min: 1 },
    available: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

const Table = model<ITable>("Table", tableSchema);

export default Table;