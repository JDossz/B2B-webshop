var express = require('express');
var router = express.Router();
const UserHandlerSql = require('../modules/userHandlerSql');
const userHS = new UserHandlerSql();


// get all
router.get('/', async (req, res, next) => {
  let userData = await userHS.readUser();
  res.render('users', {
    title: 'Users', users: userData,
  });
});

module.exports = router;
