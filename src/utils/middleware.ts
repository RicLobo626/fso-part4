import { ErrorRequestHandler, RequestHandler, Request } from "express";
import morgan from "morgan";

const unknownEndpointHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler: ErrorRequestHandler = (error: Error, _req, res, next) => {
  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).json({ error: error.message });
  }

  return next(error);
};

morgan.token("body", (req: Request) => JSON.stringify(req.body));

const requestLogger = morgan(":method :url :body - :response-time ms");

export default {
  unknownEndpointHandler,
  errorHandler,
  requestLogger,
};
