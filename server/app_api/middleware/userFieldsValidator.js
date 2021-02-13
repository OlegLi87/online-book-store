const { ResponseError } = require('./errorHandler');

function userFieldsValidator(req, res, next) {
  if (!req.body.userName || !req.body.password)
    return next(new ResponseError('Bad request', 400));
  next();
}

module.exports = userFieldsValidator;
