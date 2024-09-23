const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("../utils/config");

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isValid = user && (await bcrypt.compare(password, user.passwordHash));

  if (!isValid) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const tokenPayload = {
    username,
    id: user.id,
  };

  const token = jwt.sign(tokenPayload, config.SECRET);

  res.status(200).json({ token, username, name: user.name });
});

module.exports = loginRouter;
