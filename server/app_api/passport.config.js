const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { ResponseError } = require('./middleware/errorHandler');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userName',
    },
    async function (username, password, done) {
      try {
        const user = await User.findOne({ userName: username });
        if (!user) throw 'authError';
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw 'authError';
        done(null, user);
      } catch (error) {
        done(new ResponseError('Authorization failed!', 401), false);
      }
    }
  )
);
