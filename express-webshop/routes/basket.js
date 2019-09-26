var express = require('express');
var router = express.Router();

const MariaDBmain = require('../modules/webshop-mariadb');
const database = new MariaDBmain();
const PugData = require('./../modules/pug-data');
const pugdb = new PugData();


router.get('/', async (req, res, next) => {
  // adott user-hez tartozó itemek lekérése
  let basketData = await database.readRecord('basket', { 'userid': req.user.id });
  let totalPrice = await database.getTotalPrice(req);
  //let projectName = await database.nameToProjectId(req)
  // let projectPrice = await database.priceToProjectId(req)

  if (req.user.id) {
    res.render('basket', {
      title: 'Basket',
      basketItems: basketData,
      //projectName: projectName[0],
      // projectPrice: projectPrice[0],
      totalPrice: totalPrice[0].amount,
      user: req.user || {},
    })
  };

});

// törlés projektek egyedi id-je alapján
router.get('/:id', async (req, res, next) => {
  let result = await database.deleteRecord('basket', { 'id': req.params.id });
  res.redirect('/basket');
});

// a bejelentkezett user kosarának ürítése
router.get('/empty/:userid', async (req, res, next) => {
  let result = await database.deleteRecord('basket', { 'userid': req.user.id });
  res.redirect('/basket')
});

// post a projekt details oldalról
router.post('/:id', async (req, res, next) => {

  let result = await pugdb.createRecord('basket', {
    'projectid': req.params.id,
    'userid': req.user.id || 0,
    'quantity': 1,
  });
  res.redirect('/basket');

});

module.exports = router;