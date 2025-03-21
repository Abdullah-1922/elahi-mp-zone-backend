import { model, Schema } from "mongoose";
import { TAnalyticsLog } from "./analyticsLog.interface";

const AnalyticsSchema = new Schema<TAnalyticsLog>({
  product: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  singleUnitPrice: {
    type: Number,
    required: true,
  },
  unitsSold: {
    type: Number,
    required: true,
  },
  deliveryLoss: {
    type: Number,
    required: true,
  },
  totalSales: {
    type: Number,
    required: true,
  },
  totalLoss: {
    type: Number,
    required: true,
  },
  totalRevenue: {
    type: Number,
    required: true,
  },
},{timestamps:true});
export const Analytics = model<TAnalyticsLog>("Analytics", AnalyticsSchema);
