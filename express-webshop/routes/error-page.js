let express = require('express');

let router = express.Router();

router.get('/', async (req, res) => {
  res.render('error-page', {
    title: 'Hoppika :(',
  });
});

module.exports = router;
