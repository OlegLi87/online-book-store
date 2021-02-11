function responseSender(res, data, statusCode = 200) {
  if (!data || (data instanceof Array && !data.length)) {
    data = { message: 'No data was found' };
    statusCode = 404;
  }
  res.status(statusCode).send(data);
}

module.exports = responseSender;
