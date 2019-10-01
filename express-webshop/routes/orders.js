const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();

// post a basket oldalról
router.post('/:projectid', async (req, res) => {

  if (req.user.id) {
    //const basketItemsWithNamesAndPrices = await database.namingAndPricingProjects(req);
    let data = await database.readRecord('baskets', {
      userid: req.user.id,
      from: 'INNER JOIN projects ON projects.id = baskets.projectid',
      select: 'projects.title, projects.donation, projects.balance, projects.id as pid, baskets.quantity as quantity, baskets.id, baskets.projectid, baskets.userid',
      groupBy: 'projects.id'
    });

    while (data.length) {
      const basketItem = data.shift();
      const ordersQuantity = basketItem.quantity;
      const balanceOfProjects = basketItem.balance + basketItem.donation * basketItem.quantity;

      await database.createRecord('orders', {
        projectid: basketItem.projectid,
        userid: req.user.id || 0,
        quantity: ordersQuantity,
        status: 1
      });

      await database.updateRecord('projects', {
        id: basketItem.projectid,
      },
        { balance: balanceOfProjects })

    }
    await database.deleteRecord('baskets',
      { userid: req.user.id });

    res.redirect('/baskets');

  }

});

module.exports = router;