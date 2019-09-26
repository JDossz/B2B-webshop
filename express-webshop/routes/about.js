var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('about', {
    title: 'About Us',
    user: req.user || {},
  });
})

module.exports = router;