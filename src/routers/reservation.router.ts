import { Router } from "express";
import {
  handleCreateReservation,
  handleGetReservation,
  handleGetAllReservations,
  handleDeleteReservation,
  handleCancelReservation,
} from "@/controller/reservation/reservation.controller";
import { isLogin } from "@/middlewares/auth.middleware";

const reservationRouter: Router = Router();

reservationRouter.post("/", isLogin, handleCreateReservation);
reservationRouter.get("/:id", isLogin, handleGetReservation);
reservationRouter.get("/", isLogin, handleGetAllReservations);
reservationRouter.delete("/:id", isLogin, handleDeleteReservation);
reservationRouter.delete("/code", handleCancelReservation);

export default reservationRouter;