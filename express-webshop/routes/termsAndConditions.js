const express = require('express');

const router = express.Router();

/* GET Terms page. */
router.get('/terms', (req, res, next) => {
  res.render('termsAndConditions', { title: 'Terms and Conditions' });
});

module.exports = router;
