const { Users } = require("./models/userModel");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

exports.initializingPassport = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, function (jwt_payload, done) {
      Users.findOne({ email: jwt_payload.email }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
exports.jwtOptions = jwtOptions;
