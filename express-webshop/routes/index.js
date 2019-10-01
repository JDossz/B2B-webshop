const express = require('express');
const PugData = require('../modules/pug-data');

const router = express.Router();

const pugData = new PugData();

/* GET kérés küldésekor home page-re: */
router.get('/', async (req, res, next) => {
  // res.json(await pugData.readSpecificTable('projects', { contact: 'Katerine Genney' }));
  const projectsList = await pugData.readSpecificTable('projects');
  const usersList = await pugData.readSpecificTable('users');
  const projectsToCarousel = [];
  const projectsToFeature = [];
  const usersToShow = [];

  while (projectsToCarousel.length < 5) {
    const index = Math.floor(Math.random() * usersList.length + 1);
    if (projectsList[index]) {
      projectsToCarousel.push(projectsList[index]);
    }
  }

  while (projectsToFeature.length < 3) {
    const index = Math.floor(Math.random() * projectsList.length + 1);
    if (projectsList[index]) {
      projectsToFeature.push(projectsList[index]);
    }
  }

  while (usersToShow.length < 3) {
    const index = Math.floor(Math.random() * projectsList.length + 1);
    if (usersList[index]) {
      usersToShow.push(usersList[index]);
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
