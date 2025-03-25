import express from "express";
import { FeedbackControllers } from "./feedback.controller";

const router = express.Router();

// Routes for feedback management
router.post("/", FeedbackControllers.createFeedback);
router.patch("/:id/toggle", FeedbackControllers.toggleFeedback);
router.get("/", FeedbackControllers.getAllFeedbacks);

export const FeedbackRoutes = router;
