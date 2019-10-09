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

  const amountOfUsersPoints = await database.readRecord('users', {
    id: req.user.id,
    select: 'users.points as points, users.donations as donations'
  })

  allUserPoints = amountOfUsersPoints[0].donations;
   allPoints = amountOfUsersPoints[0].points;
 

  let lastfunded = await database.previousOrdersByProjectName(req)
  // let firstfunded = await database.previousOrdersByOneProjectName(req)
  // let firsttwofunded = await database.previousOrdersByTwoProjectName(req)
  // firstfunded = firstfunded;

  // if (allPoints == 0) {
  //   donatedProjects = 0
  //   lastfunded = {}
  // }
  // if (allPoints == 1) {
  //   lastfunded = firstfunded;
  //   donatedProjects;
  // }
  // if (allPoints == 2) {
  //   lastfunded = firsttwofunded;
  //   donatedProjects;
  // }
  // if (allPoints > 2) {
  //   lastfunded;
  //   donatedProjects;
  // }



  const awardsList = await database.readRecord('awards', {});
  let donaterLevel = '';
  for (let i = awardsList.length - 1; i > 0; i--) {
    if (req.user.points < awardsList[i].requiredpoints) {
      donaterLevel = awardsList[i - 1].level;
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
