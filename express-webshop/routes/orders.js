var express = require('express');
var router = express.Router();
const OrderHandlerSql = require('./../modules/orderHandlerSql');
const orderHS = new OrderHandlerSql();


// get all
router.get('/', async (req, res, next) => {
  let orderData = await orderHS.read();
  res.render('orders', {
    title: 'Orders', orders: orderData,user: req.user || {}
  });
});


// Create new order
// router.get('/new', async (req, res, next) => {
//   res.render('new-order');
// });

// router.post('/', async (req, res, next) => {
//   let result = await orderHS.create(req.body);
//   res.json(result);
//   res.redirect('/order');
// });

// update order
// router.get('/update/:id', async (req, res, next) => {
//   let selectedOrder = await orderHS.readOne(req.params.id);
//   res.render('update-order', { order: selectedOrder[0] });
// });

// router.post('/update', async (req, res, next) => {
//   let result = await orderHS.update(req.body);
//   res.json(result);
//   res.redirect('/orders');
// });

// router.get('/delete/:id', async (req, res, next) => {
//   let result = await orderHS.delete(req.params.id);
//   res.json(result);
// });

module.exports = router;