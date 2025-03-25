import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AnalyticsLogServices } from "./analyticsLog.service";

const createAnalytics = catchAsync(async (req, res) => {
  const result = await AnalyticsLogServices.createAnalytics(req.body);
  sendResponse(res, {
    statusCode: 201,
    data: result,
    message: "Analytics created successfully",
    success: true,
  });
});

const getAllAnalytics = catchAsync(async (req, res) => {
    const result = await AnalyticsLogServices.getAllAnalytics();
    sendResponse(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: "All Analytics fetched successfully",
    });

});

const deleteAnalytics = catchAsync(async (req, res) => {
    const result = await AnalyticsLogServices.deleteAnalytics(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        data: result,
        success: true,
        message: "Analytics deleted successfully",
    });
});


export const AnalyticsLogControllers = {
    createAnalytics,
    getAllAnalytics,
    deleteAnalytics
};