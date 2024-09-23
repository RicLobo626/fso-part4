require("express-async-errors");
const express = require("express");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.set("strictQuery", false);

const app = express();

app.use(middleware.requestLogger);
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/login", routes.login);
app.use("/api/users", routes.users);
app.use("/api/blogs", routes.blogs);
app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);

module.exports = app;
