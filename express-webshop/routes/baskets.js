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

  let actualQuantity = await database.readRecord('baskets', {
    userid: req.user.id,
    select: 'SUM(baskets.quantity) as totalQuantity',
  });
  actualQuantity = actualQuantity[0].totalQuantity;
  // ez a két lekérdezés és a helyük a basket.pug-ban kísérleti, nem biztos, hogy a basketben kéne legyenek
  // let ordersFromThePastSortByOrderID = await database.readRecord('orderdetails', {
  //   userid: req.user.id,
  //   from: 'INNER JOIN projects ON projects.id = orderdetails.projectid',
  //   select: 'SUM(projects.donation*orderdetails.quantity) as amount, projects.title, projects.donation, orders.quantity, orders.insdate',
  //   groupBy: 'orders.id'
  // });

  // let ordersFromThePastSortByProjectName = await database.readRecord('orders', {
  //   userid: req.user.id,
  //   from: 'INNER JOIN projects ON projects.id = orders.projectid',
  //   select: 'SUM(projects.donation*orders.quantity) as amount, projects.title, projects.donation, orders.quantity, orders.insdate',
  //   groupBy: 'projects.title'
  // });
  if (req.user.id) {
    res.render('baskets', {
      user: req.user || {},
      basketItemsWithNamesAndPrices: data,
      totalPrice: price,
      user: req.user || {},
      showQuantity: actualQuantity,
      // sortByOrdersID: ordersFromThePastSortByOrderID,
      // sortByProjectName: ordersFromThePastSortByProjectName
    });
    //console.log(data[0].amount, "ez a data[0].amount")
  }

});

// a bejelentkezett user kosarának ürítése
router.get('/empty/:userid', async (req, res) => {
  database.deleteRecord('baskets', { userid: req.user.id });
  res.render('baskets', {
    user: req.user || {},

  });
});

router.post('/donate', async (req, res) => {
  // Lekérjük, ami a kosárban van.
  let basket = await database.readRecord('baskets', {
    userid: req.user.id,
  });
  basket = basket.filter(el => el.hasOwnProperty('id'));
  let quantitySum = 0;
  basket.forEach(el => {
    quantitySum += el.quantity
  });
  await database.createRecord('orders', {
    userid: req.user.id,
    quantity: quantitySum,
  });
  let orderID = await database.readRecord('orders', {
    userid: req.user.id,
    limit: 1,
    orderBy: 'id DESC',
  });
  orderID = orderID[0].id;
  basket.forEach(el => {
    database.createRecord('orderdetails', {
      orderid: orderID,
      projectid: el.projectid,
      quantity: el.quantity,
    });
  });
  await database.deleteRecord('baskets', {
    userid: req.user.id,
  })

});

// post a project details oldalról
router.post('/:id', async (req, res) => {
  let quantity = await database.readRecord('baskets', {
    userid: req.user.id || 0,
    projectid: req.params.id,
    from: 'INNER JOIN projects ON projects.id = baskets.projectid',
    select: 'baskets.quantity as quantity',
  });

  if (quantity[0] === undefined) {
    await database.createRecord('baskets', {
      projectid: req.params.id,
      userid: req.user.id || 0,
      quantity: req.body.projectQuantity || 1,
    });
  } else {
    let incrementedQuantity = quantity[0].quantity + parseInt(req.body.projectQuantity, 10);
    await database.updateRecord('baskets', {
      projectid: req.params.id,
      userid: req.user.id || 0,
    }, {
      quantity: incrementedQuantity,
    });

  }
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
    quantity: decrementedQuantity,
  });
  res.redirect('/baskets');
});

router.post('/updateAdd/:id', async (req, res) => {
  let quantity = await database.readRecord('baskets', {
    id: req.params.id
  });
  let incrementedQuantity = quantity[0].quantity + 1;
  await database.updateRecord('baskets', {
    id: req.params.id
  }, {
    quantity: incrementedQuantity
  });
  res.redirect('/baskets');
});

module.exports = router;