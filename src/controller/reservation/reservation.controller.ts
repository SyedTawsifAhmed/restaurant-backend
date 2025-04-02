import { Request, Response, NextFunction} from "express";
import { successResponse } from "@/utils/response";
import { validateReservation } from "@/validators/reservation.validator";
`import { createError } from "@/config";`
import { 
  createReserveration,
  getReservation, 
  getAllReservations,
  checkAvailability,
  deleteReservation,
  cancelReservation
} from "@/services/reservation/reservation.service";

// Work in progress
export const handleCreateReservation = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    if (!req.body.specialRequest) {
      req.body.specialRequest = "";
    }
    const validReservation = validateReservation.parse(req.body);
    // Temporary
    const { 
      name, 
      email, 
      phone, 
      guestCount, 
      specialRequest, 
      reservationTime,
      parking 
    } = validReservation;
    const reservationCode = Math.
      floor(Math.random() * 1000000).
      toString().
      padStart(6, "0");
    const tables = await checkAvailability(reservationTime, guestCount);
    const reservationRequest = {
      name,
      email,
      phone,
      guestCount,
      specialRequest,
      reservationTime,
      parking,
      tables,
      reservationCode
    }
    // 

    const reservation = await createReserveration(reservationRequest);
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
  _req: Request,
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

export const handleDeleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  try {
    await deleteReservation(req.params.id);
    successResponse(res, {
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleCancelReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  try {
    await cancelReservation(req.params.code);
    successResponse(res, {
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};