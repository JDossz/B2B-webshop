const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');
const PugData = require('../modules/pug-data');
const pugdb=new PugData();
const database = new MariaDBmain();

const router = express.Router();
const ProjectsDB = require('../modules/projectsDB');

const projectsDB = new ProjectsDB();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const projectsSorted = await database.readRecord('projects', {});
  projectsSorted.sort((a, b) => {
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
  const resultSize = projectsSorted.length;
  const viewSize = 10;

  /* If you have query string, then this will run, if not just normal render */
  if (req.query.limit && req.query.page !== undefined) {
    const getData = [];
    projectsSorted.forEach((data, index) => {
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
    });
  }

  res.render('projects', {
    projects: projectsSorted,
    numberOfproducts: resultSize,
    displaySize: viewSize,
  });
});

router.post('/', (req, res, next) => {
  res.cookie('viewSize', req.body.limit, {
    maxAge: 900000,
  });
  res.redirect('/projects');
});


router.get('/arts', async (req, res, next) => {
  const projects = await database.readRecord('projects', {
    'category': '"arts"',
  });
  res.render('projects', {
    projects: await projects,
  });
});
router.get('/biology', async (req, res, next) => {
  const projects = await database.readRecord('projects', {
    'category': '"biology"',
  });
  res.render('projects', {
    projects: await projects,
  });
});
router.get('/gender', async (req, res, next) => {
  const projects = await database.readRecord('projects', {
    'category': '"technology"',
  });
  res.render('projects', {
    projects: await projects,
  });
});
router.get('/technology', async (req, res, next) => {
  const projects = await database.readRecord('projects', {
    'category': '"technology"',
  });
  res.render('projects', {
    projects: await projects,
  });
});
router.get('/neurology', async (req, res, next) => {
  const projects = await database.readRecord('projects', {
    'category': '"neurology"',
  });
  res.render('projects', {
    projects: await projects,
  });
});

// :3000/projects/:table/?id=7
router.get('/:seo', async (req, res, next) => {
  const selectedProject = await pugdb.readRecordBySEO(req);
  console.log(selectedProject[0]);
  res.render('projectDetails', {
    project: selectedProject[0],
  });
});

module.exports = router;
