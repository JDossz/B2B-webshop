const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();

router.get('/', async (req, res) => {
  await database.readRecord('baskets', { userid: req.user.id });
  const totalPrice = await database.getTotalPrice(req);
  const basketItemsWithNamesAndPrices = await database.namingAndPricingProjects(req);

  if (req.user.id) {
    res.render('baskets', {
      title: 'Baskets',
      basketItemsWithNamesAndPrices,
      totalPrice: totalPrice[0].amount,
      user: req.user || {},
    })
  };
});

router.post('/update/:pid', async (req, res) => {
  const basketItemsWithNamesAndPrices = await database.namingAndPricingProjects(req);
  if (req.user.id) {
    database.updateRecord('baskets', { projectid: req.params.pid }, {
      quantity: 2,
    });
    console.log(basketItemsWithNamesAndPrices)

    res.redirect('/baskets');
  }
})

// törlés projektek egyedi id-je alapján
router.get('/del/:id', async (req, res) => {
  database.deleteRecord('baskets', { id: req.params.id });
  console.log(req.params.id)
  res.redirect('/baskets');
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

module.exports = router;