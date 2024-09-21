import "dotenv/config";
import "express-async-errors";
import express from "express";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import { Document, Schema, Types, set, model, connect } from "mongoose";
import { IBlog } from "./utils/types";

set("strictQuery", false);

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

const Blog = model<IBlog>("Blog", blogSchema);

const app = express();

app.use(middleware.requestLogger);
app.use(express.json());

app.get("/api/blogs", async (_req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const blog = new Blog(req.body);

  await blog.save();

  res.status(201).json(blog);
});

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

const connectToDB = async () => {
  try {
    await connect(process.env.MONGODB_URI!);
    logger.info("Connected to DB");
  } catch (e) {
    logger.error("Couldn't connect to DB: ", e);
    process.exit(1);
  }
};

const init = async () => {
  await connectToDB();

  const PORT = process.env.PORT || 3002;

  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
};

void init();
