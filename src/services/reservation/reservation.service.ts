import Reservation from "@/models/reservation.model";

export const createReseveration = async (data: any) => {
  const reservation = await Reservation.create(data);
  return reservation;
};