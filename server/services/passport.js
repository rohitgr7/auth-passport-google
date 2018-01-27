const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./../config/keys');
const User = require('mongoose').model('users');

const googleStrategyOptions = {
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
};

const googleStrategy = new GoogleStrategy(googleStrategyOptions, (accessToken, refreshToken, profile, done) => {
  const googleId = profile.id;

  User.findOne({ googleId })
    .then(user => {
      if (!user) {
        new User({ googleId }).save()
          .then(user => done(null, user));
      } else {
        done(null, user);
      }
    });
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

passport.use(googleStrategy);
