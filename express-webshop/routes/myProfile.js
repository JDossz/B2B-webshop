const express = require('express');
const BetagDB = require('./../modules/webshop-mariadb');

const router = express.Router();
const database = new BetagDB();

/* GET kérés küldésekor profile page-re: */
router.get('/', async (req, res, next) => {
  return res.render('myProfile', {
    title: 'Profile Page',
    user: req.user || {},
  });
});

module.exports = router;