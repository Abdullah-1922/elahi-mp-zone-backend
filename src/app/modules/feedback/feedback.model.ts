import { model, Schema } from "mongoose";
import { TFeedBack } from "./feedback.interface";

const feedbackSchema = new Schema<TFeedBack>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    profession: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    isHidden: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Feedback = model<TFeedBack>("Feedback", feedbackSchema);
