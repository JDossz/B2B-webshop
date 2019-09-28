var express = require('express');
var router = express.Router();

const MariaDBmain = require('../modules/webshop-mariadb');
const database = new MariaDBmain();
const PugData = require('./../modules/pug-data');



router.get('/', async (req, res, next) => {
  // adott user-hez tartozó itemek lekérése
  let basketData = await database.readRecord('baskets', { userid: req.user.id });
  let totalPrice = await database.getTotalPrice(req);
  let projectName = await database.nameToProjectId(req);
  

  if (req.user.id) {
    res.render('baskets', {
      title: 'Baskets',
      basketItems: basketData,
      basketItemsWithNames: projectName,
      totalPrice: totalPrice[0].amount,
      user: req.user || {},
    })
  };

});

// törlés projektek egyedi id-je alapján
router.get('/del/:id', async (req, res, next) => {
  console.log(req)
  let result = await database.deleteRecord('baskets', { 'id': req.params.id });
  console.log(req.params.id)
  res.redirect('/baskets');
});

// a bejelentkezett user kosarának ürítése
router.get('/empty/:userid', async (req, res, next) => {
  let result = await database.deleteRecord('baskets', { 'userid': req.user.id });
  res.redirect('/baskets')
});

// post a projekt details oldalról
router.post('/:id', async (req, res, next) => {
  console.log(req.params)
  let result = await database.createRecord('baskets', {
    projectid: req.params.id,
    userid: req.user.id || 0,
    quantity: 1,
  });
  res.redirect('/baskets');
  s
});

module.exports = router;