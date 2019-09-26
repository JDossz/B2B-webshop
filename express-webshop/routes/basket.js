var express = require('express');
var router = express.Router();
const BasketHandlerSql = require('./../modules/basketHandlerSql');
const basketHS = new BasketHandlerSql();
const counter = 0;

router.get('/', async (req, res, next) => {
  let basketData = await basketHS.read();
  res.render('basket', {
    title: 'Basket', basketItems: basketData,user: req.user || {}
  });
});


router.get('/post/:id', async (req, res, next) => {
  let selectedItem = await basketHS.readOne(req.params.id);
  res.render('basket', { basket: selectedItem[0],user: req.user || {} });
});

router.post('/cart', async (req, res, next) => {
  let result = await basketHS.post(req.body);
  res.json(result);
  res.redirect('/basket');
});

router.get('/delete/:id', async (req, res, next) => {
  let result = await basketHS.delete(req.params.id);
  res.json(result);
});

// totalCart() {
//   let total = 0;
//   for (let i = 0; i < basketList.length; i++) {
//     total += basketList[i];
//   }
//   return total;
// }

module.exports = router;