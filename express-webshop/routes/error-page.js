var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('error-page', {
    title: 'Hoppika :('
  });
})

module.exports = router;