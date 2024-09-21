import mongoose, { Document, Schema, Types } from "mongoose";
import { IBlog } from "../utils/types";

const blogSchema = new Schema<IBlog>({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (_doc: Document, returnObj) => {
    returnObj.id = returnObj._id as Types.ObjectId;
    delete returnObj._id;
    delete returnObj.__v;
  },
});

export default mongoose.model<IBlog>("Blog", blogSchema);
