import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils/response";
import { createError } from "@/config";
import { validateFilter, validateStatus } from "@/validators/payment.validator";
import { 
  createPayment, 
  getPayment, 
  getAllPayments,
  filterPayments,
  updatePaymentStatus,
} from "@/services/payment/payment.service";

// Temporary
export const handleCreatePayment = async (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  try {
    const validPayment = req.body; 
    const payment = await createPayment(validPayment);
    successResponse(res, {
      message: "Payment created successfully",
      payload: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetPayment = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const payment = await getPayment(req.params.id);
    if (!payment) {
      return next(createError(404, "Payment not found"));
    }
    successResponse(res, {
      message: "Payment fetched successfully",
      payload: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllPayments = async (
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const payments = await getAllPayments();
    successResponse(res, {
      message: "Payments fetched successfully",
      payload: payments,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFilterPayments = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const valid = validateFilter.parse(req.body);
    const payments = await filterPayments(valid.query, valid.value);
    successResponse(res, {
      message: "Payments fetched successfully",
      payload: payments,
    })
  } catch (error) {
    next(error);
  }
};

export const handleUpdatePaymentStatus = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const valid = validateStatus.parse(req.body);
    const payment = await updatePaymentStatus(req.params.id, valid.status);
    if (!payment) {
      return next(createError(404, "Payment not found"));
    }
    successResponse(res, {
      message: "Payment status updated successfully",
      payload: payment,
    });
  } catch (error) {
    next(error);
  }
};
