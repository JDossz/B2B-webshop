const express = require('express');

const router = express.Router();
const ProjectsDB = require('../modules/projectsDB');

const projectsDB = new ProjectsDB();
/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.render('projects', {
    projects: await projectsDB.read(),
  });
});
router.get('/arts', async (req, res, next) => {
  const projects = await projectsDB.read();  
  res.render('projects', {
    projects: projects.filter(project => project.category === 'arts'),
  });
});
router.get('/biology', async (req, res, next) => {
  const projects = await projectsDB.read();  
  res.render('projects', {
    projects: projects.filter(project => project.category === 'biology'),
  });
});
router.get('/gender', async (req, res, next) => {
  const projects = await projectsDB.read();  
  res.render('projects', {
    projects: projects.filter(project => project.category === 'gender'),
  });
});
router.get('/technology', async (req, res, next) => {
  const projects = await projectsDB.read();  
  res.render('projects', {
    projects: projects.filter(project => project.category === 'technology'),
  });
});
router.get('/neurology', async (req, res, next) => {
  const projects = await projectsDB.read();  
  res.render('projects', {
    projects: projects.filter(project => project.category === 'neurology'),
  });
});
router.get('/:id', async (req, res, next) => {
  const selectedProject = await projectsDB.read(req.params.id);
  res.render('projectDetails', {
    project: selectedProject[0],
  });
});

module.exports = router;
