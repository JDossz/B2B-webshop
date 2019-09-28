const express = require('express');
const router = express.Router();
const MariaDBmain = require('../modules/webshop-mariadb');
const database = new MariaDBmain();

router.get('/', async (req, res) => {
  await database.readRecord('baskets', { userid: req.user.id });
  const totalPrice = await database.getTotalPrice(req);
  const projectName = await database.namingAndPricingProjects(req);

  if (req.user.id) {
    res.render('baskets', {
      title: 'Baskets',
      basketItemsWithNamesAndPrices: projectName,
      totalPrice: totalPrice[0].amount,
      user: req.user || {},
    })
  };
});

// törlés projektek egyedi id-je alapján
router.get('/del/:id', async (req, res) => {
  database.deleteRecord('baskets', { id: req.params.id });
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