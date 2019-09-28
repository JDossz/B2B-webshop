const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();

router.post('/:projectid', async (req, res) => {
  const basketData = await database.readRecord('baskets', { userid: req.user.id });
  const basketItemsWithNamesAndPrices = await database.namingAndPricingProjects(req);
  console.log(projectName.length)

  if (req.user.id) {
    for (let k in basketItemsWithNamesAndPrices) {
      if (basketItemsWithNamesAndPrices.length > 0) {

        await database.createRecord('orders', {
          projectid: basketItemsWithNamesAndPrices[0].projectid,
          userid: req.user.id || 0,
          quantity: 1,
          status: 1
        });

        basketItemsWithNamesAndPrices.shift();
        basketData.shift();
      }
    }
    res.redirect('/baskets');
    res.render('baskets')
  }
});

module.exports = router;