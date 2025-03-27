import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils/response";
import { validateRefund } from "@/validators/refund.validator";
import { 
  createRefund, 
  getRefund, 
  getAllRefunds,
} from "@/services/refund/refund.service";

export const handleCreateRefund = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const validRefund = validateRefund.parse(req.body);
    const refund = await createRefund({
      preOrderId: validRefund.preorderId,
      paymentId: validRefund.paymentId,
      refundReason: validRefund.refundReason,});
    successResponse(res, {
      message: "Refund created successfully",
      payload: refund,
    });    
  } catch (error) {
    next(error);
  }
};

export const handleGetRefund = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const refund = await getRefund(req.params.id);
    successResponse(res, {
      message: "Refund fetched successfully",
      payload: refund,
    });    
  } catch (error) {
    next(error);
  }
};

export const handleGetAllRefunds = async (
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const refunds = await getAllRefunds();
    successResponse(res, {
      message: "Refunds fetched successfully",
      payload: refunds,
    });    
  } catch (error) {
    next(error);
  }   
};


