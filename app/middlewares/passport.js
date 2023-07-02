const User = require('../models/userModel');
const { Strategy, ExtractJwt } = require('passport-jwt');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "thisi^$%@@thesec%^$&ret45575*43059535412@$%3434",
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      await User.findById(payload._id)
        .then((user) => {
          // console.log(user);
          if (user) {
            return done(null, user);
          }
        })
        .catch((err) => {
          return done(null, false);
        });
    }),
  );
};
