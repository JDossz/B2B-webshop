var express = require('express');
var router = express.Router();


// get all
router.get('/', async (req, res, next) => {
  let orderData = await orderHS.read();
  res.render('orders', {
    title: 'Orders', orders: orderData,user: req.user || {}
  });
});


module.exports = router;