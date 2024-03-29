const express = require('express');
const MariaDBmain = require('../modules/webshop-mariadb');

const router = express.Router();
const database = new MariaDBmain();


// Sorts by title and institution
function sortByTitle(projects) {
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
}

// Limits to 10 projects/page, makes pagination
function pagination(projects, categoryList, req, res) {
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
        categories: categoryList,
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
        categories: categoryList,
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
      categories: categoryList,
      projects: currentPageData,
      numberOfproducts: resultSize,
      prevPage: previosPage,
      nextPage: nextOnePage,
      displaySize: viewSize,
      user: req.user || {},
    });
  }

  res.render('projects', {
    categories: categoryList,
    projects,
    numberOfproducts: resultSize,
    displaySize: viewSize,
    user: req.user || {},
  });
}

/* GET users listing. */
router.get('/', async (req, res) => {
  if (req.query.search) {
    const projects = await database.readRecordWithLike(req);
    const categoryList = await database.readRecord('categories', {});
    sortByTitle(projects);
    pagination(projects, categoryList, req, res);
  }
  const projects = await database.readRecord('projects', {
    isactive: 1,
  });
  const categoryList = await database.readRecord('categories', {});
  sortByTitle(projects);
  pagination(projects, categoryList, req, res);
});

// Creates cookie with viewSize
router.post('/', (req, res) => {
  res.cookie('viewSize', req.body.limit, {
    maxAge: 900000,
  });
});

// Get projects by category
router.get('/categories/:category', async (req, res) => {
  const projects = await database.readProjectsByCategory(req.params.category);
  const categoryList = await database.readRecord('categories', {});

  sortByTitle(projects);
  pagination(projects, categoryList, req, res);
});


// :3000/projects/:table/?id=7
router.get('/:seo', async (req, res) => {
  const urlParts = req.originalUrl.split('/');
  const seoName = urlParts[urlParts.length - 1];
  const selectedProject = await database.readRecord('projects', {
    seo: seoName,
    isactive: 1,
  });
  if (await selectedProject[0] === undefined) {
    res.render('no-project');
  }

  const progressPercentage = parseInt((selectedProject[0].balance / selectedProject[0].goal) * 100, 10);

  res.render('projectDetails', {
    title: 'Projects on Enrtyway',
    percentage: progressPercentage,
    project: selectedProject[0],
    user: req.user || {},
  });
});

module.exports = router;
