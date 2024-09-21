import mongoose from "mongoose";
import logger from "./logger";
import config from "./config";

export const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to DB");
  } catch (e) {
    logger.error("Couldn't connect to DB: ", e);
    process.exit(1);
  }
};
