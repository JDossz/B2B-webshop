var express = require('express');
var router = express.Router();

const MariaDBmain = require('../modules/webshop-mariadb');
const database = new MariaDBmain();


get all
router.get('/', async (req, res, next) => {
  let userData = await database.readRecord('users', {});
  res.render('users', {
    title: 'Users',
    users: userData,
    user: req.user || {}
  });
});
module.exports = router;
