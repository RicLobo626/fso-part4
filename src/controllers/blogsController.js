const Blog = require("../models/Blog.js");

const getBlogs = async (_req, res) => {
  const blogs = await Blog.find({}).populate("author", {
    id: 1,
    username: 1,
    name: 1,
  });

  res.json(blogs);
};

const createBlog = async (req, res) => {
  const blog = new Blog({ ...req.body, author: req.user.id });

  req.user.blogs.push(blog.id);

  await blog.save();
  await req.user.save();

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
