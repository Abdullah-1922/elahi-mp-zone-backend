import { Types } from "mongoose";

export type TFeedBack = {
  user: Types.ObjectId;
  profession: string;
  feedback: string;
  isHidden: boolean;
};


