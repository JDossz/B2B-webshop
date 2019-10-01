const express = require('express');
const BetagDB = require('./../modules/webshop-mariadb');

const router = express.Router();
const database = new BetagDB();

router.get('/', async (req, res, next) => {
  res.render('thankyou');
});

module.exports = router;
