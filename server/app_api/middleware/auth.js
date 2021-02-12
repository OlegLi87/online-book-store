const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ResponseError } = require('./errorHandler');

async function userAuth(req, res, next) {
  try {
    const authField = req.headers.authorization;
    const token = authField.slice('Bearer'.length + 1);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ userName: payload.userName });
    if (!user) throw new Error();
    const index = user.tokens.findIndex((t) => t.token === token);
    if (index === -1) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new ResponseError('Authorization failed', 401));
  }
}

function adminAuth(req, res, next) {
  if (!req.user.admin)
    return next(new ResponseError('Admin authorization failed', 401));
  next();
}

module.exports = { userAuth, adminAuth };
