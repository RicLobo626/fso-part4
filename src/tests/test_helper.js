const Blog = require("../models/Blog");
const { Types } = require("mongoose");

const initialBlogs = [
  {
    title: "First blog",
    author: "John Doe",
    url: "http://example.com",
    likes: 5,
  },

  {
    title: "The blog",
    author: "Bob Smith",
    url: "http://boblogs.com",
    likes: 7,
  },
  {
    title: "Some blog",
    author: "Jane Doe",
    url: "http://jane.com",
    likes: 3,
  },
];

const getNonExistingId = () => new Types.ObjectId();

const getBlogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const resetBlogsInDB = async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
};

module.exports = {
  initialBlogs,
  getNonExistingId,
  getBlogsInDB,
  resetBlogsInDB,
};
