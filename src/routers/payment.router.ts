import { Router } from "express";
import {
  handleCreatePayment,
  handleGetPayment,
  handleGetAllPayments,
  handleUpdatePaymentStatus,
  handleFilterPayments,
} from "@/controller/payment/payment.controller";
import { isLogin } from "@/middlewares/auth.middleware";

const paymentRouter: Router = Router();

paymentRouter.post("/", handleCreatePayment);
paymentRouter.get("/:id", handleGetPayment);
paymentRouter.get("/", isLogin, handleGetAllPayments);
paymentRouter.patch(
  "/:id", 
  isLogin, 
  handleUpdatePaymentStatus
);
paymentRouter.get("/filter", isLogin, handleFilterPayments);

export default paymentRouter;