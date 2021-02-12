const router = require('express').Router();
const usersController = require('../controllers/users');
const userFieldsValidator = require('../middleware/userFieldsValidator');
const { userAuth } = require('../middleware/auth');

router.post('/signup', userFieldsValidator, usersController.signUp);
router.post('/signin', usersController.signIn);
router.post('/signout', userAuth, usersController.signOut);

module.exports = router;
