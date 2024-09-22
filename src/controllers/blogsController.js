const Blog = require("../models/Blog.js");

const getBlogs = async (_req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
};

const createBlog = async (req, res) => {
  const blog = new Blog(req.body);

  await blog.save();

  res.status(201).json(blog);
};

module.exports = {
  getBlogs,
  createBlog,
};
