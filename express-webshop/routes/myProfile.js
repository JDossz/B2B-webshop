const express = require('express');
const BetagDB = require('./../modules/webshop-mariadb');

const router = express.Router();
const database = new BetagDB();

router.all('/', async (req, res, next) => {
  const auth = await database.checkLogin(req);
  if (!auth) {
    return res.render('error-page', {
      title: 'Nem-nem :)',
    });
  } if (auth) {
    next();
  }
});

/* GET kérés küldésekor profile page-re, ha be vagyunk jelentkezve: */
router.get('/', async (req, res) => {
  const awardsList = await database.readRecord('awards', {});
  let donaterLevel = '';
  for (let i = 0; i < awardsList.length; i++) {
    if (req.user.points < awardsList[i].requiredpoints) {
      donaterLevel = awardsList[i].level;
    }
  }

  res.render('myProfile', {
    title: 'Profile Page',
    donaterLevel,
    user: req.user || {},
  });
});

module.exports = router;
