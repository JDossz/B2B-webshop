var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('contact', {
    title: 'Hoppika :('
  });
})

module.exports = router;