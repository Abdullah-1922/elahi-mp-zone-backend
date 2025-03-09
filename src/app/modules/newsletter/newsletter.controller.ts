import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NewsletterServices } from "./newsletter.service";

const createNewsletter = catchAsync(async (req, res) => {
    if(!req.body.email){
     throw new AppError(400,"Email is required");   
    }
    const staff = await NewsletterServices.createNewsletter(req.body.email);
  
    sendResponse(res, {
      statusCode: 200,
      message: "Newsletter created successfully",
      data: staff,
      success: true,
    });
  });

  const getAllNewsletter = catchAsync(async (req, res) => {
    const staff = await NewsletterServices.getAllNewsletter();
  
    sendResponse(res, {
      statusCode: 200,
      message: "All Newsletter",
      data: staff,
      success: true,
    });
  });
  export const NewsletterControllers = {
    createNewsletter,
    getAllNewsletter
  }
