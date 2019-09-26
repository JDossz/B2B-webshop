var express = require('express');
var router = express.Router();


// get all
router.get('/', async (req, res, next) => {
  let userData = await userHS.readUser();
  res.render('users', {
    title: 'Users', users: userData,
  });
});

module.exports = router;
