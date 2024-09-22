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

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);

  res.status(204).end();
};

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
};
