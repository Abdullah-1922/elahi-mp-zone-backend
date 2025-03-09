import mongoose, { Schema } from "mongoose";
import { TNewsletter } from "./newsletter.interface";

// Create schema
const newsletterSchema = new Schema<TNewsletter>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export model
export const Newsletter = mongoose.model<TNewsletter>(
  "Newsletter",
  newsletterSchema,
);
