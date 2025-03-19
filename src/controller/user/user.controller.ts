import { Request, Response, NextFunction } from "express";
import User from "@/models/user.model";
import { createError } from "@/config";
import { successResponse } from "@/utils/response";
import { findWithId } from "@/services";

export const handleGetLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(403, "User not authenticated"));
    }
    const options = {
      password: 0,
    };
    const loggedInUser = await findWithId(req.user._id, User, options);
    console.log({
      loggedInUser,
    });
    successResponse(res, {
      message: "Fetched loggedIn user successfully",
      payload: loggedInUser,
    });
  } catch (error) {
    next(error);
  }
};

export const handleFindAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const option = { password: 0 };
    const count = await User.countDocuments(filter);

    const users = await User.find(filter, option)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    if (!users || users.length === 0)
      return next(createError(404, "user not found"));

    successResponse(res, {
      statusCode: 200,
      message: "Users were returned successfully",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleUserDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(createError(400, "User not deleted , Something Went Wrong"));
    }
    successResponse(res, {
      message: "User was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserProfileInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    );
    if (!user) {
      return next(createError(404, "User not found"));
    }
    successResponse(res, {
      message: "User profile updated successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
