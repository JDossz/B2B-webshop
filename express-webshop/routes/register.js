var express = require('express');
var router = express.Router();

/* GET register form */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register Form' });
});

module.exports = router;
