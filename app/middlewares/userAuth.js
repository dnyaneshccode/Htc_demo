const passport = require('passport');
const { unauthorisedRequest } = require('../middlewares/response');

// Passport Middleware.
const userAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return unauthorisedRequest(
        req,
        res,
        'Authentication failed: Invalid token.',
      );
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = userAuth;
