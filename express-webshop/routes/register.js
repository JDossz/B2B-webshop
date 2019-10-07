const express = require('express');
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
router.get('/', (req, res) => {
  res.render('register', {
    title: 'Register',
  });
});

router.post('/users', async (req, res) => {
  const token = getToken();

  if (req.body.emailaddress) {
    const usersDatabase = await database.readRecord('users', {});
    for (let i = 0; i < usersDatabase.length; i += 1) {
      if (usersDatabase[i].emailaddress === req.body.emailaddress) {
        return res.render('register', {
          wrong: 'This email is already registered, try to sign in instead!',
        });
      }
    }
  }

  await database.createRecord('users', {
    emailaddress: req.body.emailaddress,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    token,
  });

  if (req.body.newsletter == 'on') {
    await database.createRecord('newsletter', {
      emailaddress: req.body.emailaddress,
    });
  }

  return res.redirect('/');

});

module.exports = router;
