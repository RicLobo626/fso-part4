import "express-async-errors";
import express from "express";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import config from "./utils/config";
import mongoose from "mongoose";
import blogsRouter from "./routes/blogsRouter";

mongoose.set("strictQuery", false);

const app = express();

app.use(middleware.requestLogger);
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to DB");
  } catch (e) {
    logger.error("Couldn't connect to DB: ", e);
    process.exit(1);
  }
};

const init = async () => {
  await connectToDB();

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

void init();
