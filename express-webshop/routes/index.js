const express = require('express');
const BetagDB = require('./../modules/webshop-mariadb');

const router = express.Router();
const database = new BetagDB();

/* GET kérés küldésekor home page-re: */
router.get('/', async (req, res, next) => {
  const projectsList = await database.readRecord('projects', {});
  const usersList = await database.readRecord('users', {});
  const projectsToCarousel = [];
  const projectsToFeature = [];
  const usersToShow = [];

  while (projectsToCarousel.length < 5) {
    const index = Math.floor(Math.random() * projectsList.length + 1);
    if (projectsList[index]) {
      if (projectsToCarousel.length == 0) {
        projectsToCarousel.push(projectsList[index]);
      } else if (projectsToCarousel.indexOf(projectsList[index]) == -1) {
        projectsToCarousel.push(projectsList[index]);
      }
    }
  }

  while (projectsToFeature.length < 3) {
    const index = Math.floor(Math.random() * projectsList.length + 1);
    if (projectsList[index]) {
      if (projectsToFeature.length == 0) {
        projectsToFeature.push(projectsList[index]);
      } else if (projectsToFeature.indexOf(projectsList[index]) == -1) {
        projectsToFeature.push(projectsList[index]);
      }
    }
  }

  while (usersToShow.length < 3) {
    const index = Math.floor(Math.random() * usersList.length + 1);
    if (usersList[index]) {
      if (usersToShow.length == 0) {
        usersToShow.push(usersList[index]);
      } else if (usersToShow.indexOf(usersList[index]) == -1) {
        usersToShow.push(usersList[index]);
      }
    }
  }

  return res.render('index', {
    title: 'Entryway - BETAG Team',
    carousel: projectsToCarousel,
    featurette: projectsToFeature,
    funders: usersToShow,
    user: req.user || {},
  });
});

module.exports = router;
