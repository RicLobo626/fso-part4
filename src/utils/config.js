require("dotenv").config();

const { NODE_ENV, PORT, MONGODB_URI, TEST_MONGODB_URI, SECRET } = process.env;

module.exports = {
  PORT,
  SECRET,
  NODE_ENV,
  MONGODB_URI: NODE_ENV === "test" ? TEST_MONGODB_URI : MONGODB_URI,
};
