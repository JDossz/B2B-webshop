const express = require('express');
const sha1 = require('sha1');

const router = express.Router();
const MariaDB = require('../modules/webshop-mariadb/mariadb-main');

const database = new MariaDB();

const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 25 + 65);
    result += String.fromCharCode(index);
  }
  return result;
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Express',
  });
});

router.post('/', async (req, res, next) => {
  const result = await database.readRecord('users', {
    username:req.body.username,
    password: req.body.password,
  });
  if (result.length === 1) {
    const token = getToken();
    res.cookie('userID', token);
    await database.updateRecord('users', {
      id: result[0].id,
    }, {
      'token': token,
    });
    return res.redirect('/');
  }
  res.render('login', {
    wrong: 'Incorrect email or password',
  });
});

module.exports = router;
