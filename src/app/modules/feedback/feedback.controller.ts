import { Request, Response } from "express";
import { FeedbackServices } from "./feedback.service";
import catchAsync from "../../utils/catchAsync";

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await FeedbackServices.createFeedback(payload);

  res.status(201).json({
    success: true,
    message: "Feedback created successfully",
    data: result,
  });
});

const toggleFeedback = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FeedbackServices.toggleFeedback(id);

  res.status(200).json({
    success: true,
    message: "Feedback visibility toggled successfully",
    data: result,
  });
});

const getAllFeedbacks = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackServices.getAllFeedbacks();

  res.status(200).json({
    success: true,
    message: "Feedbacks retrieved successfully",
    data: result,
  });
});

export const FeedbackControllers = {
  createFeedback,
  toggleFeedback,
  getAllFeedbacks,
};
