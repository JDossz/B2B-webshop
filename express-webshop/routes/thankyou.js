const express = require('express');
const BetagDB = require('./../modules/webshop-mariadb');

const router = express.Router();
const database = new BetagDB();

router.get('/', async (req, res, next) => {
  if (req.query.hasOwnProperty('emailaddress')) {
    database.createRecord('newsletter', { emailaddress: req.query.emailaddress });
  }

  res.render('thankyou', {
    title: 'Hearty thank you',
    user: req.user || {},
  });
});

module.exports = router;
