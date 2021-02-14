const router = require('express').Router();
const usersController = require('../controllers/users');
const userFieldsValidator = require('../middleware/userFieldsValidator');
const { userAuth } = require('../middleware/auth');
const passport = require('passport');

router.post('/signup', userFieldsValidator, usersController.signUp);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  usersController.signIn
);
router.post('/signout', userAuth, usersController.signOut);
router.get('/cart', userAuth, usersController.getCart);
router.put('/cart', userAuth, usersController.saveCart);

module.exports = router;
