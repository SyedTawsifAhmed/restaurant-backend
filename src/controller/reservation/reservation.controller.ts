import { Request, Response, NextFunction} from "express";
import { successResponse } from "@/utils/response";
import { validateReservation } from "@/validators/reservation.validator";
`import { createError } from "@/config";`
import { 
  createReseveration,
  getReservation, 
  getAllReservations 
} from "@/services/reservation/reservation.service";

// Work in progress
const findConflicts = (data: any) => {
  return data;
};

export const handleCreateReservation = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const validReservation = validateReservation.parse(req.body);
    await findConflicts(validReservation);
    const reservation = await createReseveration(validReservation);
    successResponse(res, {
      message: "Reservation created successfully",
      payload: reservation,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  try {
    const { id } = req.params;
    const reservation = await getReservation(id);
    successResponse(res, {
      message: "Reservation fetched successfully",
      payload: reservation,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllReservations = async (
  res: Response,
  next: NextFunction
  )=> {
  try {
    const reservations = await getAllReservations();
    successResponse(res, {
      message: "Reservations fetched successfully",
      payload: reservations,
    });
  } catch (error) {
    next(error);
  }
}

export const handleDeleteReservation = async () => {};