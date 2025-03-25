import { Router } from "express";
import { AnalyticsLogControllers } from "./analyticsLog.controller";
import { AnalyticsLogValidation } from "./analyticsLog.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get("/", AnalyticsLogControllers.getAllAnalytics);
router.post(
  "/",
  validateRequest(AnalyticsLogValidation.createAnalyticsLogValidation),
  AnalyticsLogControllers.createAnalytics,
);
router.delete("/:id", AnalyticsLogControllers.deleteAnalytics);



export const AnalyticsLogRoutes = router;