const User = require('../models/user');
const { ResponseError } = require('../middleware/errorHandler');

async function signUp(req, res, next) {
  try {
    const user = new User(req.body);
    const saved = await user.save().catch((err) => {
      throw new ResponseError(err.message, 400);
    });
    const token = await user.generateAuthToken();
    res.status(201).send({ saved, token });
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {}

async function signOut(req, res, next) {
  try {
    await req.user.removeToken(req.token);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { signIn, signUp, signOut };
