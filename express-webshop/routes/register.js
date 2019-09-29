const express = require('express');
const sha1 = require('sha1');
const MariaDB = require('../modules/webshop-mariadb');

const database = new MariaDB();
const router = express.Router();
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
  res.render('register', {
    title: 'Register',
  });
});

router.post('/users', async (req, res, next) => {
  const token = getToken();
  console.log(req.body);
  console.log(token);
  await database.createRecord('users', {
    emailaddress: req.body.emailaddress,
    username: sha1(req.body.username),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: sha1(req.body.password),
    token,
  });
  return res.redirect('/');
});

module.exports = router;
