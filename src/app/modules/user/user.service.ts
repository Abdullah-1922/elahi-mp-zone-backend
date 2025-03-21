import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

import { IUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";

// Create a new user (signup with email)
const createUser = async (userData: IUser) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  if (
    !userData.email ||
    !userData.password ||
    !userData.name ||
    !userData.image
  ) {
    throw new AppError(400, "All fields are required");
  }
  // Hash password
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  const result = await User.create(userData);
  return result;
};

// Login with email and password
const loginUser = async (email: string, password: string) => {
  // Find user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(404, "User not found");
  }
  if (user.loginProvider === "google") {
    throw new AppError(400, "Please login with Google");
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password!);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    config.jwt_access_secret!,
    { expiresIn: config.jwt_access_expires_in },
  );

  return {
    user: user.toObject(),
    accessToken,
  };
};

// Google signup/login
const googleAuth = async (googleData: {
  email: string;
  name: string;
  googleId: string;
  image: string;
}): Promise<{ user: IUser; accessToken: string }> => {
  // Check if user exists
  let user = await User.findOne({ email: googleData.email });

  if (!user) {
    // Create new user if doesn't exist

    user = await User.create({
      email: googleData.email,
      name: googleData.name,
      googleId: googleData.googleId,
      image: googleData.image,
      loginProvider: "google",
    });
  } else if (!user.googleId) {
    // Update existing user with Google ID
    user = await User.findByIdAndUpdate(user._id, {
      googleId: googleData.googleId,
      isVerified: true,
    });
  }

  if (!user) {
    throw new AppError(404, "User not found");
  }
  // Generate JWT token
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    config.jwt_access_secret!,
    { expiresIn: config.jwt_access_expires_in },
  );

  return {
    user: user.toObject(),
    accessToken,
  };
};

// Get all users
const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

// Get a single user by ID
const geIUserById = async (id: string): Promise<IUser | null> => {
  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) {
    throw new Error("Invalid ID");
  }
  const result = await User.findById(id);
  return result;
};

// Get a user by email
const geIUserByEmail = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email });
  return result;
};

// Update user
const updateUser = async (
  id: string,
  userData: Partial<IUser>,
): Promise<IUser | null> => {
  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) {
    throw new Error("Invalid ID");
  }
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const isValidId = mongoose.isValidObjectId(id);
  if (!isValidId) {
    throw new Error("Invalid ID");
  }
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  loginUser,
  googleAuth,
  getAllUsers,
  geIUserById,
  geIUserByEmail,
  updateUser,
  deleteUser,
};
