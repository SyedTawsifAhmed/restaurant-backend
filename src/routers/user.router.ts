import {
  handleGetLoggedInUser,
  handleUpdateUserProfileInfo
} from "@/controller/user/user.controller";
import { isLogin } from "@/middlewares/auth.middleware";
import validateRequest from "@/validators";
import { validateUserUpdate } from "@/validators/user.validator";
import { Router } from "express";
const userRouter: Router = Router();

userRouter.get("/logged-in-user", isLogin, handleGetLoggedInUser);
userRouter.put(
  "/update-user-profile",
  isLogin,
  validateRequest(validateUserUpdate),
  handleUpdateUserProfileInfo
);
export default userRouter;
