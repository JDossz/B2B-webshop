const express = require('express');

const router = express.Router();
const ProjectsDB = require('../modules/projectsDB');

const projectsDB = new ProjectsDB();

router.get('/projects', async (req, res, next) => {
  const projects = await projectsDB.read();
  res.json(projects);
});
router.get('/projects/:id', async (req, res, next) => {
  const project = await projectsDB.read(req.params.id);
  res.json(project[0]);
});

router.post('/projects', async (req, res, next) => {
  const result = await projectsDB.create(req.body);
  res.json(result);
});

router.post('/projects/:id', async (req, res, next) => {
  console.log(req.body);
  const result = await projectsDB.update(req.body);
  console.log(result);
  res.json(result);
});

router.delete('/projects/:id', async (req, res, next) => {
  const result = await projectsDB.delete(req.params.id);
  res.json(result);
});
module.exports = router;
