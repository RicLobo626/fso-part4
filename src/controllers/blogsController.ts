import { RequestHandler } from "express";
import Blog from "../models/Blog";

const getBlogs: RequestHandler = async (_req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
};

const createBlog: RequestHandler = async (req, res) => {
  const blog = new Blog(req.body);

  await blog.save();

  res.status(201).json(blog);
};

export default {
  getBlogs,
  createBlog,
};
