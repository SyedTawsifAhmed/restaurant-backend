import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils/response";
import { validatePreorder } from "@/validators/preorder.validator";
import { 
  createPreOrder, 
  getPreOrder, 
  getAllPreOrders,
  deletePreOrder,
} from "@/services/preorder/preorder.service";

export const handleCreatePreorder = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const validPreorder = validatePreorder.parse(req.body);
    const preorder = await createPreOrder(validPreorder);
    successResponse(res, {
      message: "Preorder created successfully",
      payload: preorder,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetPreorder = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const preorder = await getPreOrder(req.params.id);
    successResponse(res, {
      message: "Preorder fetched successfully",
      payload: preorder,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllPreorders = async (
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const preorders = await getAllPreOrders();
    successResponse(res, {
      message: "Preorders fetched successfully",
      payload: preorders,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeletePreorder = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    await deletePreOrder(req.params.id);
    successResponse(res, {
      message: "Preorder deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};