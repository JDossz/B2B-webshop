const express = require('express');

const router = express.Router();

/* GET Privacy Policy page. */
router.get('/', (req, res) => {
  res.render('privacyPolicy', { title: 'Privacy Policy', user: req.user || {} });
});

module.exports = router;
