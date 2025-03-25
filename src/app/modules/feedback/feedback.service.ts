import { TFeedBack } from "./feedback.interface";
import { Feedback } from "./feedback.model";

const createFeedback = async (payload: Partial<TFeedBack>) => {
  const isAlreadyExist = await Feedback.findOne({ user: payload.user });
  if (isAlreadyExist) {
    throw new Error("Feedback already exists");
  }

  const feedback = await Feedback.create(payload);
  return feedback;
};

const toggleFeedback = async (id: string) => {
  const feedback = await Feedback.findById(id);
  if (!feedback) {
    throw new Error("Feedback not found");
  }
  feedback.isHidden = !feedback.isHidden;
  await feedback.save();
  return feedback;
};

const getAllFeedbacks = async (): Promise<TFeedBack[]> => {
  const result = await Feedback.find().populate("user");
  return result;
};

export const FeedbackServices = {
  createFeedback,
  toggleFeedback,
  getAllFeedbacks,
};
