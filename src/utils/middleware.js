const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("../models/User");

const unknownEndpointHandler = (_req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (error, _req, res, next) => {
  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
    case "MongoServerError":
      if (error.message.includes("E11000 duplicate key error")) {
        return res.status(400).json({ error: "username must be unique" });
      }
      break;
    case "JsonWebTokenError":
      return res.status(401).json({ error: "invalid token" });
    case "TokenExpiredError":
      return res.status(401).json({ error: "expired token" });
    default:
      next(error);
  }
};

morgan.token("body", (req) => JSON.stringify(req.body));

const requestLogger = morgan(":method :url :body - :response-time ms");

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.slice(7);
  }

  next();
};

const userExtractor = (req, res, next) => {
  jwt.verify(req.token, config.SECRET, async (error, decodedToken) => {
    if (error) {
      return next(error);
    }

    if (!decodedToken || !decodedToken.id) {
      return res.status(401).json({ error: "invalid token" });
    }

    req.user = await User.findById(decodedToken.id);

    next();
  });
};

module.exports = {
  unknownEndpointHandler,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
