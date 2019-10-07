let express = require('express');

let router = express.Router();

router.get('/', async (req, res) => {
  res.render('about', {
    title: 'About Us',
    user: req.user || {},
  });
});

module.exports = router;
