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
  res.render('myProfile', {
    title: 'Profile Page',
    user: req.user || {},
    fundedProjects: donatedProjects,
    amountOfUsersPoints: allPoints,
    lastfunded,
  });

});

module.exports = router;
