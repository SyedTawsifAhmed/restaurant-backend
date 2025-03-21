import { Request, Response, NextFunction } from "express";
import { successResponse } from "@/utils/response";
import { validateTable } from "@/validators/table.validator";
import { 
  createTable, 
  getTable, 
  getAllTables,
  updateAvailability,
  availableTables,
  deleteTable,
} from "@/services/table/table.service";

export const handleCreateTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validTable = validateTable.parse(req.body);
    const table = await createTable(validTable);
    successResponse(res, {
      message: "Table created successfully",
      payload: table,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetTable = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  try {
    const table = await getTable(req.params.id);
    successResponse(res, {
      message: "Table fetched successfully",
      payload: table,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllTables = async (res: Response, next: NextFunction) => {
  try {
    const tables = await getAllTables();
    successResponse(res, {
      message: "Tables fetched successfully",
      payload: tables,
    });
  } catch (error) {
    next(error);
  }
};

export const handleAvailableTables = async (res: Response, next: NextFunction) => {
  try {
    const tables = await availableTables();
    successResponse(res, {
      message: "Tables fetched successfully",
      payload: tables,
    });
  } catch (error) {
    next(error);
  }
}

export const handlesUpdateAvailability = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
    try {
      const available = await updateAvailability(req.params.id);
      successResponse(res, {
        message: "Availability updated successfully",
        payload: available,
      });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteTable = async (
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
    try {
      await deleteTable(req.params.id);
      successResponse(res, {
        message: "Table deleted successfully",
      });
    } catch (error) {
      next(error);
    }
};