const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../middlewares/response');

function userController() {
  //GENERATE THE TOKEN SNIPPET.
  return {
    //REGISTER THE USER
    async register(req, res) {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return sendErrorResponse(req, res, 'Validation failed');
        }

        const { first_name, email, last_name, password, cpassword } =
          req.body;
        const hashedPasswords = await bcrypt.hash(password, 12);
        const hashedConfirmPasswords = await bcrypt.hash(cpassword, 12);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return sendErrorResponse(req, res, 'Email is already registered');
        }

        const newUser = new User({
          first_name,
          last_name,
          email,
          password: hashedPasswords,
          cpassword: hashedConfirmPasswords,
        });

        await newUser.save();
        return sendSuccessResponse(req, res, 'User registered successfully');
      } catch (err) {
        console.log(err);
        return sendErrorResponse(req, res, err.message);
      }
    },
    async signIn(req, res) {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return sendErrorResponse(
            req,
            res,
            'Please enter your email and password',
          );
        }

        const userLogin = await User.findOne({ email });
        if (!userLogin) {
          return sendErrorResponse(req, res, 'Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
        });

        if (!isMatch) {
          return sendErrorResponse(req, res, 'Invalid login credentials');
        }
        return sendSuccessResponse(req, res, 'Login successfully done', token);
      } catch (err) {
        console.log(err);
        return sendErrorResponse(req, res, err.message);
      }
    },

    async generateNewAccessToken(req, res) {
      try {
        const { email, refreshToken } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
          return sendErrorResponse(req, res, 'Invalid login credentials');
        }

        const tokens = user.tokens;
        let validRefreshTokenFound = false;

        for (const item of tokens) {
          const storedRefreshToken = item.refreshTokens;

          if (storedRefreshToken === refreshToken) {
            validRefreshTokenFound = true;
            break;
          }
        }

        if (!validRefreshTokenFound) {
          return sendErrorResponse(req, res, 'Invalid login credentials');
        }

        try {
          const decoded = jwt.verify(refreshToken, 'SECRET_KEY_REFRESH_TOKEN');
          // You can use the decoded data if needed
          // For example: const userId = decoded._id;

          const { token } = await user.generateAuthToken();

          res.cookie('jwt', token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true,
          });

          return sendSuccessResponse(
            req,
            res,
            'Access Token Generated Successfully',
            token,
          );
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            return sendErrorResponse(
              req,
              res,
              'Authentication failed: Invalid token',
            );
          } else {
            throw error;
          }
        }
      } catch (err) {
        console.error(err);
        return sendErrorResponse(req, res, 'Internal Server Error');
      }
    },

    async logout(req, res, next) {
      try {
        const user = req.user;

        // Remove the specific access token from the user's tokens array
        req.user.tokens = req.user.tokens.filter((currelem) => {
          return currelem.tokens != req.tokens;
        });

        await user.save();

        res.clearCookie('jwt');
        return sendSuccessResponse(req, res, 'Logout Successful');
      } catch (err) {
        console.error(err);
        return sendErrorResponse(req, res, 'Internal Server Error');
      }
    },
    async testingroles(req, res) {
      res.send('HELLLLOO HOW ARE YOUUUUU');
    },
  };
}

module.exports = userController;
