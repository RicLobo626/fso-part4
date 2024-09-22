const mongoose = require("mongoose");
const logger = require("./logger");
const config = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to DB");
  } catch (e) {
    logger.error("Couldn't connect to DB: ", e);
    process.exit(1);
  }
};

const disconnect = () => mongoose.connection.close();

module.exports = { connect, disconnect };
