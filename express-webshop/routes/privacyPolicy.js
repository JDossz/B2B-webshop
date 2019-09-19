const express = require('express');

const router = express.Router();

/* GET Privacy Policy page. */
router.get('/', (req, res, next) => {
  res.render('privacyPolicy', { title: 'Privacy Policy' });
});

module.exports = router;
