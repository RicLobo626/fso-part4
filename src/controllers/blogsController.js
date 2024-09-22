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

const likeBlog = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (blog) {
    return res.json(blog);
  }

  res.status(404).json({ error: "Blog not found" });
};

module.exports = {
  getBlogs,
  likeBlog,
  createBlog,
  deleteBlog,
};
