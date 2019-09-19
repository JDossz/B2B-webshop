var express = require('express');
var router = express.Router();
const orderHandlerSql = require('./../modules/orderHandlerSql');
const orderHS = new orderHandlerSql();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ message: 'Server works' });
}) // sima api-ra indított kérésre így megy a válasz

// get all

router.get('/orders', async (req, res, next) => {
  let result = await orderHS.read();
  res.json(result);
});

// get one

router.get('/orders/:id', async (req, res, next) => {
  let result = await orderHS.readOne(req.params.id);
  res.json(result);
})

// post

router.post('/orders', async (req, res, next) => {
  let posted = await orderHS.create(req.body);
  res.json(posted);
})

// update

router.put('/orders/:id', async (req, res, next) => {
  let updated = await orderHS.update(req.body);
  res.json(updated);
})

// delete

router.delete('/orders/:id', async (req, res, next) => {
  let deleted = await orderHS.delete(req.params.id)
  res.json(deleted);
})

module.exports = router;