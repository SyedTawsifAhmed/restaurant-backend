import { Router } from "express";
import {
  handleCreateRefund,
  handleGetRefund,
  handleGetAllRefunds,
} from "@/controller/refund/refund.controller";
import { isLogin } from "@/middlewares/auth.middleware";

const refundRouter: Router = Router();

refundRouter.post("/", isLogin, handleCreateRefund);
refundRouter.get("/:id", isLogin,handleGetRefund);
refundRouter.get("/", isLogin, handleGetAllRefunds);

export default refundRouter;
