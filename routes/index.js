var express = require('express');
var index = express.Router();

var { router } = require('./api/users')
var product = require('./api/product')
var order = require('./api/order')
var admin = require('./api/admin')

/* GET home page. */
index.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = { index, users: router, product, order, admin };
