import { Schema, model } from "mongoose";

const restaurantConfigSchema = new Schema({
  restaurantName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  maxTables: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  maxParkingSpots: { type: Number, required: true },
});

const RestaurantConfig = model("RestaurantConfig", restaurantConfigSchema);

export default RestaurantConfig;