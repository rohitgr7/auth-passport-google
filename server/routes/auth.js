const passport = require('passport');
const router = require('express').Router();

require('./../services/passport');

const googleAuthentication = passport.authenticate('google', {
  scope: ['profile', 'email']
});

const passportGoogleAuthenticate = passport.authenticate('google');

router.get('/google', googleAuthentication);

router.get('/google/callback', passportGoogleAuthenticate, (req, res) => {
  res.send({ message: 'You are authenticated!!' });
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.send({ message: "You are logged out!!" });
});

module.exports = router;
