const mongoose = require('mongoose');

errorObj = {
  message: 'Error occured',
  responseStatus: 400,
};

function errorHandler(res, error) {
  if (error.kind === 'ObjectId') {
    errorObj.message = 'Provided id is not in valid format';
  } else errorObj.message = error.message;
  res.status(errorObj.responseStatus).send({ message: errorObj.message });
}

module.exports = errorHandler;
