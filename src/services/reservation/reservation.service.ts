import Reservation from "@/models/reservation.model";
import { timeSlots, maxGuests } from "@/config/restaurant";
import { findWithId } from "@/services";
import { getAllTables } from "../table/table.service";

const compareTimeSlots = (time: Date) => {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return timeSlots.includes(`${hours}:${minutes}`);
};

export const checkAvailability = async (time: Date, guestCount: number) => {
  try {
    if (!compareTimeSlots(time)) {
      throw new Error("Invalid time slot");
    }

    const timeReservations = await Reservation.find({ reservationTime: time });
    const tables = await getAllTables();

    let reservedGuests = timeReservations.reduce(
      (sum, res) => sum + res.guestCount, 0
    );

    if (reservedGuests + guestCount > maxGuests) {
      throw new Error("Guest count exceeds maximum");
    }

    const availableTables = tables.filter((table) => table.available);
    if (availableTables.length === 0) {
      throw new Error("No available tables");
    }

    let remainingGuests = guestCount;
    const selectedTables = [];

    for (const table of availableTables.sort((a, b) => a.seats - b.seats)) {
      if (remainingGuests <= 0) break;
      selectedTables.push(table);
      remainingGuests -= table.seats;
    }

    if (remainingGuests > 0) {
      throw new Error("Not enough table capacity");
    }

    return selectedTables;
  } catch (error) {
    throw error;
  }
};


export const createReserveration = async (data: {
  name: string;
  email: string;
  phone: string;
  guestCount: number;
  specialRequest: string;
  reservationTime: Date;
  parking: boolean;
  reservationCode: string;
  }) => {
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

export const deleteReservation = async (id: string) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation) {
      throw new Error("Reservation not found");
    }
  } catch (error) {
    throw error;
  }
};