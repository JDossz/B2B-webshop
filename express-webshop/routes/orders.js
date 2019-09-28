var express = require('express');
var router = express.Router();

const MariaDBmain = require('../modules/webshop-mariadb');
const database = new MariaDBmain();

// get all
// router.get('/', async (req, res, next) => {
//   let orderData = await database.readRecord('orders', {});
//   res.render('orders', {
//     title: 'Orders', orders: orderData, user: req.user || {}
//   });
// });

router.post('/:projectid', async (req, res, next) => {
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