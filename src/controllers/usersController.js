const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUser = async (req, res) => {
  const { name, username, password } = req.body;

  const pwdMinLength = 3;

  if (!password || password.length < pwdMinLength) {
    return res.status(400).json({
      error: `Password must be at least ${pwdMinLength} characters long`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  await user.save();

  res.status(201).json(user);
};

const getUsers = async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    likes: 1,
    url: 1,
    id: 1,
  });

  res.json(users);
};

module.exports = {
  createUser,
  getUsers,
};
