const express = require('express');
const router = express.Router();
const MariaDBmain = require('../modules/webshop-mariadb');
const database = new MariaDBmain();

router.post('/:projectid', async (req, res) => {
  const basketData = await database.readRecord('baskets', { userid: req.user.id });
  if (req.user.id) {
    await database.createRecord('orders', {
      projectid: basketData[0].projectid,
      userid: req.user.id || 0,
      quantity: 1,
      status: 1
    });
    res.redirect('/baskets');
    res.render('baskets')
  }
});

module.exports = router;