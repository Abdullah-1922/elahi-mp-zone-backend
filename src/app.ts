import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();

// Set up CORS, cookie parser, and JSON parsing
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:3001",
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type", "x-refresh-token","sentry-trace","baggage"], // allow Authorization header
    exposedHeaders: ["Authorization", "set-cookie"],
  }),
);

app.set("trust proxy", true);

// Application routes
app.use("/api/v1", router);

// Welcome route
app.get("/", (req, res) => {
  console.log(req.ip?.toString());
  res.status(200).json({
    message: "Welcome to the Elahi MP Zone API",
  });
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound); // 404 handler

export default app;
