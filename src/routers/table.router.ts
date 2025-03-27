import { Router } from "express";
import {
  handleCreateTable,
  handleGetTable,
  handleGetAllTables,
  handleAvailableTables,
  handleDeleteTable,
} from "@/controller/table/table.controller";
import { isLogin } from "@/middlewares/auth.middleware";

const tableRouter: Router = Router();

tableRouter.post("/", isLogin, handleCreateTable);
tableRouter.get("/:id", isLogin, handleGetTable);
tableRouter.get("/", isLogin, handleGetAllTables);
tableRouter.get("/available", isLogin, handleAvailableTables);
tableRouter.delete("/:id", isLogin, handleDeleteTable);

export default tableRouter;
