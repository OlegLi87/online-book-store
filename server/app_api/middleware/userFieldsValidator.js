const { ResponseError } = require('./errorHandler');

function userFieldsValidator(req, res, next) {
  if (!req.body.userName || !req.body.password)
    return next(new ResponseError('User data not complete', 400));
  next();
}

module.exports = userFieldsValidator;
