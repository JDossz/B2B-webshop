var express = require('express');
var router = express.Router();
const OrderHandlerSql = require('./../modules/orderHandlerSql');
const orderHS = new OrderHandlerSql();
const UserHandlerSql = require('../modules/userHandlerSql');
const userHS = new UserHandlerSql();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ message: 'Server works' });
}) // sima api-ra indított kérésre így megy a válasz

// get all orders

router.get('/orders', async (req, res, next) => {
  let result = await orderHS.read();
  res.json(result);
});

// get one order

router.get('/orders/:id', async (req, res, next) => {
  let result = await orderHS.readOne(req.params.id);
  res.json(result);
})

// create order

router.post('/orders', async (req, res, next) => {
  let posted = await orderHS.create(req.body);
  res.json(posted);
})

// update order

router.put('/orders/:id', async (req, res, next) => {
  let updated = await orderHS.update(req.body);
  res.json(updated);
})

// delete order

router.delete('/orders/:id', async (req, res, next) => {
  let deleted = await orderHS.delete(req.params.id)
  res.json(deleted);
})

// get all user
router.get('/', async (req, res, next) => {
  let userData = await userHS.readUser();
  res.render('users', {
    title: 'Users', users: userData,
    loggedIn: req.user
  });
});


// get all users /api/

router.get('/users', async (req, res, next) => {
  let result = await userHS.readUser();
  res.json(result);
});

// get one user

router.get('/users/:id', async (req, res, next) => {
  let result = await userHS.readOneUser(req.params.id);
  res.json(result);
})

// create user

router.post('/users', async (req, res, next) => {
  let posted = await userHS.createUser(req.body);
  res.json(posted);
})

// update user

router.put('/users/:id', async (req, res, next) => {
  let updated = await userHS.updateUser(req.body);
  res.json(updated);
})

// delete user

router.delete('/users/:id', async (req, res, next) => {
  let deleted = await userHS.deleteUser(req.params.id)
  res.json(deleted);
})

module.exports = router;