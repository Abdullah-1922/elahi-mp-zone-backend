import { TAnalyticsLog } from "./analyticsLog.interface";
import { Analytics } from "./analyticsLog.model";

const createAnalytics = async (data: TAnalyticsLog) => {
  const result = await Analytics.create(data);
  return result;
};
const getAllAnalytics = async () => {
  const result = await Analytics.find().sort({ createdAt: -1 });
  return result;
};
const deleteAnalytics = async (id: string) => {
  const result = await Analytics.findByIdAndDelete(id);
  return result;
};
export const AnalyticsLogServices = {
  createAnalytics,
  getAllAnalytics,
  deleteAnalytics,
};
