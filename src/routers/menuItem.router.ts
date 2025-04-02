import { Router } from "express";
import {
  handleCreateMenuItem,
  handleGetMenuItem,
  handleGetAllMenuItems,
  handleUpdateMenuItem,
  handleDeleteMenuItem,
} from "@/controller/menuItem/menuItem.controller";
import validateRequest from "@/validators";
import { validateMenuItem } from "@/validators/menuItem.validator";
import { isLogin } from "@/middlewares/auth.middleware";

const menuItemRouter: Router = Router();

menuItemRouter.post(
  "/",
  isLogin,
  validateRequest(validateMenuItem),
  handleCreateMenuItem
);
menuItemRouter.get("/:id", handleGetMenuItem);
menuItemRouter.get("/", handleGetAllMenuItems);
menuItemRouter.patch(
  "/:id",
  isLogin,
  validateRequest(validateMenuItem),
  handleUpdateMenuItem
);
menuItemRouter.delete("/:id", isLogin, handleDeleteMenuItem);

export default menuItemRouter;

