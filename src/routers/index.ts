import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import reservationRouter from "./reservation.router";
import tableRouter from "./table.router";
import menuItemRouter from "./menuItem.router";
import preorderRouter from "./preorder.router";
import refundRouter from "./refund.router";
import paymentRouter from "./payment.router";

const rootRouter: Router = Router();

const routes = [
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/reservation",
    router: reservationRouter,
  },
  {
    path: "/table",
    router: tableRouter,
  },
  {
    path: "/menu",
    router: menuItemRouter,
  },
  {
    path: "/preorder",
    router: preorderRouter,
  },
  {
    path: "/refund",
    router: refundRouter,
  },
  {
    path: "/payment",
    router: paymentRouter,
  },
];

routes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

export default rootRouter;
