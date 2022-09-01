const express = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../../sql/models');
const config = require('../../config.json');

const router = express.Router();

// Check if E-mail is Valid or not
const validateEmail = async (email) => {
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var user = await User.findOne({ where: { email } })
  var msg

  if (!regex.test(email) || user) {
    msg = user ? "This email address already has been taken" : "Enter a valid email address"
  }

  return msg
}

// registering a new user

router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  let errors = {};
  let isValidEmail = await validateEmail(email)

  if (password !== confirmPassword) errors.password = "Passwrod doesn't match"
  if (isValidEmail !== undefined) errors.email = isValidEmail
  if ([name, password].some(f => f === '' || f === undefined))
    errors.fields = "Please Enter all the details"

  if (Object.keys(errors).length > 0) {
    return res.json({ errors });
  }

  let user = await User.create({
    name, email, password
  })

  res.json(user)

});

router.post('/login', async (req, res) => {

  const { email, password } = req.body
  let errors = {};

  if (email === '' || email === undefined) {
    errors = { ...errors, email: 'This field is required' };
  }
  if (password === '' || password === undefined) {
    errors = { ...errors, password: 'This field is required' };
  }

  if (Object.keys(errors).length > 0) {
    return res.json({ errors });
  }

  const user = await User.findOne({ where: { email } })

  if (password !== user.password) {
    return res.json({ errors: { invalidCredentials: 'Invalid Username or Password' } });
  }
  const token = jwt.sign({
    id: user.id,
    isAdmin: user.isAdmin,
    email: user.email
  }, config.jwtSecret);

  res.json({ token })

});

// middleware for authenticating a request

const isAuthenticated = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"]
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'No token provided' })
  }
}


module.exports = { router, isAuthenticated, validateEmail }
