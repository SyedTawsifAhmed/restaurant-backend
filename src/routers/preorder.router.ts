import { Router } from "express";
import {
  handleCreatePreorder,
  handleGetPreorder,
  handleGetAllPreorders,
  handleDeletePreorder,
} from "@/controller/preorder/preorder.controller";
import { isLogin } from "@/middlewares/auth.middleware";

const preorderRouter: Router = Router();

preorderRouter.post("/", handleCreatePreorder);
preorderRouter.get("/:id", handleGetPreorder);
preorderRouter.get("/", isLogin, handleGetAllPreorders);
preorderRouter.delete("/:id", isLogin, handleDeletePreorder);

export default preorderRouter;