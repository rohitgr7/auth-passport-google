const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./db/connectDb');
require('./models/user');
const auth = require('./routes/auth');
const keys = require('./config/keys');

const app = express();

app.use(
  session({
  saveUninitialized: false,
  resave: true,
  secret: keys.sessionKey,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.use('/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
