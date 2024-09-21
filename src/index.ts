import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import express, { ErrorRequestHandler, Request, RequestHandler } from "express";
import { Document, Schema, Types, set, model, connect } from "mongoose";

set("strictQuery", false);

interface IBlog {
  id: Types.ObjectId;
  title: string;
  author: string;
  url: string;
  likes: number;
}

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

morgan.token("body", (req: Request) => JSON.stringify(req.body));

app.use(morgan(":method :url :body - :response-time ms"));
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

const unknownEndpointHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler: ErrorRequestHandler = (error: Error, _req, res, next) => {
  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
  }

  return next(error);
};

app.use(unknownEndpointHandler);
app.use(errorHandler);

const connectToDB = async () => {
  try {
    await connect(process.env.MONGODB_URI!);
    console.log("Connected to DB");
  } catch (e) {
    console.error("Couldn't connect to DB: ", e);
    process.exit(1);
  }
};

const init = async () => {
  await connectToDB();

  const PORT = process.env.PORT || 3002;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

void init();
