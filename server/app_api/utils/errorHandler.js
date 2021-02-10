const errorResponse = {
  status: 400,
  message: 'Bad Request',
};

function errorHandler(error, res) {
  if (error.kind === 'ObjectId') {
    errorResponse.message = 'Provided id is not in valid format!';
    errorResponse.status = 400;
  }

  res.status(errorResponse.status).send(errorResponse.message);
}

module.exports = errorHandler;
