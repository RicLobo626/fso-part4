import "express-async-errors";
import express from "express";
import middleware from "./utils/middleware";
import mongoose from "mongoose";
import blogsRouter from "./routes/blogsRouter";

mongoose.set("strictQuery", false);

const app = express();

app.use(middleware.requestLogger);
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

export default app;
