const express = require('express');
const MariaDB = require('../modules/webshop-mariadb');

const database = new MariaDB();
const router = express.Router();
const getToken = (l = 20) => {
  let result = '';
  for (let i = 0; i < l; i++) {
    const index = Math.round(Math.random() * 50 + 65);
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
    'email': req.body.email,
    'address': req.body.address,
    'name': req.body.name,
    'password': req.body.password,
    'token': token,
  });
  return res.redirect('/');
});

module.exports = router;
