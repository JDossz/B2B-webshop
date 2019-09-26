var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('contact', {
    title: 'Contacts',
    user: req.user || {},
  });
})

module.exports = router;