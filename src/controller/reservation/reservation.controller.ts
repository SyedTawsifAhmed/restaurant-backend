import { Request, Response, NextFunction} from "express";
import { successResponse } from "@/utils/response";
import { createReseveration } from "@/services/reservation/reservation.service";
`import { createError } from "@/config";
import { findWithId } from "@/services";
import Reservation from "@/models/reservation.model";`

export const handleCreateReservation = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const reservation = await createReseveration(req.body);
    successResponse(res, {
      message: "Reservation created successfully",
      payload: reservation,
    });
  } catch (error) {
    next(error);
  }
};