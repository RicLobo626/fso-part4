const morgan = require("morgan");

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
  }

  return next(error);
};

morgan.token("body", (req) => JSON.stringify(req.body));

const requestLogger = morgan(":method :url :body - :response-time ms");

module.exports = {
  unknownEndpointHandler,
  errorHandler,
  requestLogger,
};
