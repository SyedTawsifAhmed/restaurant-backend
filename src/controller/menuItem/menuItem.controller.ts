import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils/response";
import { validateMenuItem } from "@/validators/menuItem.validator";
import { createError } from "@/config";
import { 
  createMenuItem, 
  getMenuItem, 
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "@/services/menuItem/menuItem.service";

export const handleCreateMenuItem = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const validMenuItem = validateMenuItem.parse(req.body);
    const menuItem = await createMenuItem(validMenuItem);
    successResponse(res, {
      message: "Menu item created successfully",
      payload: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetMenuItem = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const menuItem = await getMenuItem(req.params.id);
    if (!menuItem) {
      return next(createError(404, "Menu item not found"));
    }
    successResponse(res, {
      message: "Menu item fetched successfully",
      payload: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllMenuItems = async (
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const menuItems = await getAllMenuItems();
    successResponse(res, {
      message: "Menu items fetched successfully",
      payload: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateMenuItem = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const validMenuItem = validateMenuItem.parse(req.body);
    const menuItem = await updateMenuItem(req.params.id, validMenuItem);
    if (!menuItem) {
      return next(createError(404, "Menu item not found"));
    }
    successResponse(res, {
      message: "Menu item updated successfully",
      payload: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteMenuItem = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    await deleteMenuItem(req.params.id);
    successResponse(res, {
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};