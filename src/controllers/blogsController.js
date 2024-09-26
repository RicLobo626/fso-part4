const Blog = require("../models/Blog.js");

const getBlogs = async (_req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    id: 1,
    username: 1,
    name: 1,
  });

  res.json(blogs);
};

const createBlog = async (req, res) => {
  const blog = new Blog({ ...req.body, user: req.user.id });

  req.user.blogs.push(blog.id);

  await blog.save();
  await req.user.save();

  res.status(201).json(blog);
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).end();
  }

  const isCreator = blog.user.toString() === req.user.id.toString();

  if (isCreator) {
    await blog.deleteOne();
    return res.status(204).end();
  }

  res.status(403).json({ error: "you don't have permission to delete this blog" });
};

const likeBlog = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  ).populate("user", { id: 1, username: 1, name: 1 });

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
