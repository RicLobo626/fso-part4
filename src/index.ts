import "express-async-errors";
import express from "express";
import middleware from "./utils/middleware";
import logger from "./utils/logger";
import config from "./utils/config";
import mongoose from "mongoose";
import blogsRouter from "./routes/blogsRouter";
import { connectToDB } from "./utils/db";

mongoose.set("strictQuery", false);

const app = express();

app.use(middleware.requestLogger);
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

const init = async () => {
  await connectToDB();

  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  });
};

void init();
