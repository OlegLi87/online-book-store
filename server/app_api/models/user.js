const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { userName: this.userName, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '7 days' }
  );
  this.tokens.push({ token });
  await this.save();
  return token;
};

userSchema.methods.removeToken = async function (token) {
  const index = this.tokens.findIndex((t) => t.token === token);
  this.tokens.splice(index, 1);
  await this.save();
  return true;
};

module.exports = mongoose.model('User', userSchema);
