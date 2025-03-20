import Reservation from "@/models/reservation.model";
import { findWithId } from "@/services";

export const createReseveration = async (data: any) => {
  try {
    const reservation = new Reservation(data);
    if (!reservation) {
      throw new Error("Reservation could not be created");
    }
    return await reservation.save();
  }
  catch (error) {
    throw error;
  }
};

export const getReservation = async (id: string) => {
  return await findWithId(id, Reservation);
};

export const getAllReservations = async () => {
  try {
    const reservations = await Reservation.find();
    if (!reservations) {
      throw new Error("Reservations could not be fetched");
    }
    return reservations;
  } catch (error) {
    throw error;
  }
};