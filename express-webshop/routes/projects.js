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
router.get('/:id', async (req, res, next) => {
  const selectedProject = await projectsDB.read(req.params.id);
  res.render('projectDetails', {
    project: selectedProject[0],
  });
});

module.exports = router;
