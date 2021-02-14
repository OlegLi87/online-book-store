const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ResponseError } = require('./errorHandler');

async function userAuth(req, res, next) {
  try {
    const authField = req.headers.authorization;
    const token = authField.slice('Bearer'.length + 1);
    let payload = jwt.verify(token, process.env.JWT_SECRET);
    // jwt.verify(token, process.env.JWT_SECRET, null, function (err, decoded) {
    //   if (err) tryToRemoveInvalidToken(token);
    //   else if (decoded) payload = decoded;
    // });
    const user = await findUser(payload.userName);
    if (!user) throw 'authError';
    const index = user.tokens.findIndex((t) => t.token === token);
    if (index === -1) throw 'authError';
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new ResponseError('User authorization failed', 401));
  }
}

function adminAuth(req, res, next) {
  if (!req.user.admin)
    return next(new ResponseError('Admin authorization failed', 401));
  next();
}

function tryToRemoveInvalidToken(token) {
  const payload = jwt.decode(token);
  findUser(payload.userName).then((user) => {
    user?.removeToken(token);
  });
}

async function findUser(userName) {
  return await User.findOne({ userName });
}

module.exports = { userAuth, adminAuth };
