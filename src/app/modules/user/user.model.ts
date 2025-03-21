import { Schema, model } from "mongoose";

import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
    },
    googleId: {
      type: String,
    },
    loginProvider: {
      type: String,
      enum: ["google", "email"],
      default: "email",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

export const User = model<IUser>("User", userSchema);
