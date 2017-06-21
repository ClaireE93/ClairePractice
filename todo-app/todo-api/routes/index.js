var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', todo: Todo });
});

module.exports = router;
