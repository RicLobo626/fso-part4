const { Types } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Blog = require("../models/Blog");

const initialBlogs = [
  {
    title: "First blog",
    url: "http://example.com",
    likes: 5,
  },

  {
    title: "The blog",
    url: "http://boblogs.com",
    likes: 7,
  },
  {
    title: "Some blog",
    url: "http://jane.com",
    likes: 3,
  },
];

const initialUser = {
  name: "John Doe",
  username: "johnny",
};

const getNonExistingId = () => new Types.ObjectId();

const getBlogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const resetBlogsInDB = async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
};

const getUsersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const resetUsersInDB = async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("pw123", 10);
  const user = new User({ ...initialUser, passwordHash });

  await user.save();
};

module.exports = {
  initialBlogs,
  getNonExistingId,
  getBlogsInDB,
  resetBlogsInDB,
  resetUsersInDB,
  getUsersInDB,
};
