import { Types } from "mongoose";

export interface IBlog {
  id: Types.ObjectId;
  title: string;
  author: string;
  url: string;
  likes: number;
}
