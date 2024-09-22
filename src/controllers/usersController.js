const bcrypt = require("bcrypt");
const User = require("../models/User");

const createUser = async (req, res) => {
  const { name, username, password } = req.body;

  if (!password || password.length < 4) {
    return res.status(400).json({
      error: "Password must be at least 3 characters long",
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

module.exports = {
  createUser,
};
