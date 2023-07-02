const mongoose = require('mongoose');
var randtoken = require('rand-token');
const jwt = require('jsonwebtoken');

const roleEnum = Object.freeze({
  SUPERADMIN: 1,
  ADMIN: 2,
  USER: 3,
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const isValidEmail =
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        if (!isValidEmail) {
          sendErrorResponse('Invalid email format');
        }
        return isValidEmail;
      },
    },
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  cpassword: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  role: {
    type: Number,
    enum: Object.values(roleEnum),
    default: roleEnum.SUPERADMIN,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
      refreshTokens: {
        type: String,
        required: true,
      },
    },
  ],
});

// we are generating token.
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      {
        _id: this._id,
        first_name: this.first_name,
        email: this.email,
        role: this.role,
      },
      "thisi^$%@@thesec%^$&ret45575*43059535412@$%3434",
      { expiresIn: '60s' },
    );
    let refreshToken = jwt.sign(
      {
        _id: this._id,
        first_name: this.first_name,
        role: this.role,
        expiresIn: this.expiresIn,
      },
      'SECRET_KEY_REFRESH_TOKEN',
      { expiresIn: '1d' },
    );
    this.tokens = this.tokens.create({
      token: token,
      refreshTokens: refreshToken,
    });
    await this.save();
    return { token, refreshToken };
  } catch (e) {
    console.error(e.message);
  }
};

const User = mongoose.model('user', userSchema);
module.exports = User;
