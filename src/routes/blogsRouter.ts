import { Router } from "express";
import Blog from "../models/Blog";

const blogsRouter = Router();

blogsRouter.get("/", async (_req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  await blog.save();

  res.status(201).json(blog);
});

export default blogsRouter;
