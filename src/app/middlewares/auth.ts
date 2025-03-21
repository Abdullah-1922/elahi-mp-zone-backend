/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: any) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    const token =
      accessToken && accessToken.startsWith("Bearer ")
        ? accessToken.split(" ")[1]
        : null; // Get the token from the Authorization header

    if (requiredRoles.includes("anyOne") && !token) {
      return next();
    }

    // Check if the token is missing
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized! Token is missing.",
      );
    }

    // Check if the given token is valid
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token.");
    }

    const { role, email } = decoded;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found.");
    }

    // Check if the user has the required roles
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You do not have permission to access this resource.",
      );
    }

    // Attach the user data to the request object
    req.user = { ...decoded, role };
    next();
  });
};

export default auth;
