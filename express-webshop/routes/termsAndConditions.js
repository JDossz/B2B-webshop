const express = require('express');

const router = express.Router();

/* GET Terms page. */
router.get('/', (req, res) => {
  res.render('termsAndConditions', {
    title: 'Terms and Conditions',
    user: req.user || {},
  });
});

module.exports = router;
