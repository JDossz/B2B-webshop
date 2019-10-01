const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');
const PugData = require('../modules/pug-data');

const pugdb = new PugData();
const database = new MariaDBmain();

const router = express.Router();

// Sorts by title and institution
const sortByTitle = function (projects) {
  projects.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    if (a.title === b.title) {
      if (a.institution < b.institution) {
        return -1;
      }
      if (a.institution > b.institution) {
        return 1;
      }
    }
  });
};

// Limits to 10 projects/page, makes pagination
const pagination = function (projects, req, res) {

  const resultSize = projects.length;
  const viewSize = 10;

  /* If you have query string, then this will run, if not just normal render */
  if (req.query.limit && req.query.page !== undefined) {
    const getData = [];
    projects.forEach((data, index) => {
      if (index < (req.query.page * req.query.limit)) {
        getData.push(data);
      }
    });
    if (req.query.page <= 1) {
      const previosPage = 1;
      const nextOnePage = parseInt(req.query.page, 10) + 1;
      const currentPageData = getData.slice(getData.length - req.query.limit, getData.length);
      return res.render('projects', {
        projects: currentPageData,
        numberOfproducts: resultSize,
        prevPage: previosPage,
        nextPage: nextOnePage,
        user: req.user || {},
        displaySize: viewSize,
      });
    }
    if (req.query.page >= resultSize / req.query.limit) {
      const previosPage = 1;
      const nextOnePage = Math.floor(resultSize / req.query.limit);
      const currentPageData = getData.slice(getData.length - req.query.limit, getData.length);
      return res.render('projects', {
        projects: currentPageData,
        numberOfproducts: resultSize,
        prevPage: previosPage,
        nextPage: nextOnePage,
        user: req.user || {},
        displaySize: viewSize,
      });
    }
    const previosPage = req.query.page - 1;
    const nextOnePage = parseInt(req.query.page, 10) + 1;
    const currentPageData = getData.slice(getData.length - req.query.limit, getData.length);
    return res.render('projects', {
      projects: currentPageData,
      numberOfproducts: resultSize,
      prevPage: previosPage,
      nextPage: nextOnePage,
      displaySize: viewSize,
      user: req.user || {},
    });
  }

  res.render('projects', {
    projects,
    numberOfproducts: resultSize,
    displaySize: viewSize,
    user: req.user || {},
  });
};

// set specific sidebar link to active
const setActive = (id) => {
  const element = document.getElementById(`${id}`);
  element.classList.add('active');
};

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const projects = await database.readRecord('projects', {
    isactive: 1,
  });
  sortByTitle(projects);
  pagination(projects, req, res);
});

// Creates cookie with viewSize
router.post('/', (req, res, next) => {
  res.cookie('viewSize', req.body.limit, {
    maxAge: 900000,
  });
});


// Get art projects
router.get('/arts', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Arts');
  sortByTitle(projects);
  pagination(projects, req, res);
  setActive('arts');
});

// Get biology projects
router.get('/biology', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Biology');
  sortByTitle(projects);
  pagination(projects, req, res);
});

// Get gender projects
router.get('/gender', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Gender Studies');
  sortByTitle(projects);
  pagination(projects, req, res);
});

// Get chemistry projects
router.get('/chemistry', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Chemistry');
  sortByTitle(projects);
  pagination(projects, req, res);
});

// Get computer sience projects
router.get('/computerSience', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Computer Sience');
  sortByTitle(projects);
  pagination(projects, req, res);
});

router.get('/engineering', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Engineering');
  sortByTitle(projects);
  pagination(projects, req, res);
});

router.get('/mathematics', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Mathematics');
  sortByTitle(projects);
  pagination(projects, req, res);
});

router.get('/physics', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Physics');
  sortByTitle(projects);
  pagination(projects, req, res);
});

router.get('/other', async (req, res, next) => {
  const projects = await database.readProjectsByCategory('Other');
  sortByTitle(projects);
  pagination(projects, req, res);
});

// :3000/projects/:table/?id=7
router.get('/:seo', async (req, res, next) => {
  const selectedProject = await pugdb.readRecordBySEO(req);
  console.log(selectedProject[0]);
  const progressPercentage = parseInt((selectedProject[0].balance / selectedProject[0].goal) * 100);
  res.render('projectDetails', {
    project: selectedProject[0],
    user: req.user || {},
    percentage: progressPercentage,
  });
});

module.exports = router;
