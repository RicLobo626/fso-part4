require("express-async-errors");
const express = require("express");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const blogsRouter = require("./routes/blogsRouter");

mongoose.set("strictQuery", false);

const app = express();

app.use(middleware.requestLogger);
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;
