const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();

// post a basket oldalról
router.post('/:projectid', async (req, res) => {
  if (req.user.id) {
    const basketItemsWithNamesAndPrices = await database.namingAndPricingProjects(req);

    while (basketItemsWithNamesAndPrices.length) {
      const basketItem = basketItemsWithNamesAndPrices.shift();
      await database.createRecord('orders', {
        projectid: basketItem.projectid,
        userid: req.user.id || 0,
        quantity: 1,
        status: 1
      });
    }

    await database.deleteRecord('baskets', { userid: req.user.id });
    res.redirect('/baskets');
  }
});

module.exports = router;