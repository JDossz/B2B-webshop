const express = require('express');

const router = express.Router();
const MariaDB = require('../modules/webshop-mariadb/mariadb-main');

const database = new MariaDB();

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
  res.render('login', {
    title: 'Express',
  });
});

router.post('/', async (req, res, next) => {
  const result = await database.readRecord('users',{'email':req.body.email,'password':req.body.password});
  if (result.length === 1) {
    let token = getToken();
    res.cookie('userID', token);
    await database.updateRecord('users',{'id':result[0].id},{'token':token});
    return res.redirect('/');
  }
  res.render('login', {
    wrong: 'Incorrect email or password',
  });
});

module.exports = router;