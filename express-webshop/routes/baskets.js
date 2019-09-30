const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();

router.get('/', async (req, res) => {
  let data = await database.readRecord('baskets', {
    userid: req.user.id,
    from: 'INNER JOIN projects ON projects.id = baskets.projectid',
    select: 'projects.title, projects.donation, projects.id as pid, baskets.quantity as quantity, baskets.id, baskets.projectid, baskets.userid',
  });
  data = data.filter(el => {
    return el.hasOwnProperty('projectid');
  });
  let price = await database.readRecord('projects', {
    userid: req.user.id,
    select: 'SUM(projects.donation*baskets.quantity) as amount',
    from: 'INNER JOIN baskets ON projects.id = baskets.projectid'
  });
  price = price[0].amount;
  if (req.user.id) {
    res.render('baskets', {
      basketItemsWithNamesAndPrices: data,
      totalPrice: price,
    });
  }
});

// a bejelentkezett user kosarának ürítése
router.get('/empty/:userid', async (req, res) => {
  database.deleteRecord('baskets', { userid: req.user.id });
  res.redirect('/baskets');
});

// post a projekt details oldalról
router.post('/:id', async (req, res) => {
  await database.createRecord('baskets', {
    projectid: req.params.id,
    userid: req.user.id || 0,
    quantity: 1,
  });
  res.redirect('/baskets');
});

router.post('/updateDel/:id', async (req, res) => {
  let quantity = await database.readRecord('baskets', {
    id: req.params.id
  });
  let decrementedQuantity = 0;
  if (quantity[0].quantity > 0) {
    decrementedQuantity = quantity[0].quantity - 1;
  } else {
    decrementedQuantity = 0;
  }
  await database.updateRecord('baskets', {
    id: req.params.id
  }, {
    quantity: decrementedQuantity
  });
  res.redirect('/baskets');
});

router.post('/updateAdd/:id', async (req, res) => {
  let quantity = await database.readRecord('baskets', {
    id: req.params.id
  });
  let decrementedQuantity = quantity[0].quantity + 1;
  await database.updateRecord('baskets', {
    id: req.params.id
  }, {
    quantity: decrementedQuantity
  });
  res.redirect('/baskets');
});

module.exports = router;