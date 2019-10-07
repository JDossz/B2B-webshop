const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();

// get all
router.get('/', async (req, res) => {
  const userData = await database.readRecord('users', {});

  res.render('users', {
    title: 'Users',
    user: req.user || {},
    users: userData,
  });
});

module.exports = router;
