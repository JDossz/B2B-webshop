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
router.get('/', async (req, res, next) => {
  const donatedProjectsPerUser = await database.previousOrders(req)
  donatedProjects = donatedProjectsPerUser[0].allDonatedProjects
  let lastfunded = await database.previousOrdersByProjectName(req)
  const amountOfUsersPoints = await database.readRecord('users', {
    id: req.user.id,
    select: 'users.points as points'
  })
  allPoints = amountOfUsersPoints[0].points
  
  const awardsList = await database.readRecord('awards', {});
  let donaterLevel = '';
  for (let i = awardsList.length-1; i > 0; i--) {
    if (req.user.points < awardsList[i].requiredpoints) {
      donaterLevel = awardsList[i-1].level;
    }
  }

  res.render('myProfile', {
    title: 'Profile Page',
    donaterLevel,
    fundedProjects: donatedProjects,
    amountOfUsersPoints: allPoints,
    lastfunded,
    user: req.user || {},
  });
});

module.exports = router;
