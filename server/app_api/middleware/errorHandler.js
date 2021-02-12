const mongoose = require('mongoose');

class ResponseError extends Error {
  constructor(message = 'Resource not found', statusCode = 404) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

function errorHandler(error, req, res, next) {
  if (error instanceof ResponseError)
    res.status(error.statusCode).send({ message: error.message });
  else res.status(500).send({ message: 'Server internal error' });
}

module.exports = { errorHandler, ResponseError };
