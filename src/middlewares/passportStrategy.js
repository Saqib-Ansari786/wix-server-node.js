import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

const passportStrategy = () => {
  // using google auth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              verified: true,
              googleId: profile.id,
            });
          }
          console.log(user);
          return cb(null, user);
        } catch (error) {
          cb(error, null);
        }
      }
    )
  );

  /**
   * add other strategy -- if any like facebook etc
   */

  // must add function for passport strategy configuration
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export default passportStrategy;
