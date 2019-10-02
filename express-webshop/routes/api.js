const express = require('express');

const router = express.Router();

const Database = require('./../modules/webshop-mariadb');
const database = new Database();

router.all('/', async (req, res, next) => {
  const auth = await database.checkLogin(req);
  if (!auth || auth.admin === 0) {
    return res.render('error-page', {
      title: 'Nem-nem :)',
    });
  } else if (auth && auth.admin === 1) {
    next();
  }
});

router.all('/:dzsampf', async (req, res, next) => {
  console.log('q-keys: ', req.cookies.userID);
  const auth = await database.checkLogin(req);
  console.log('auth: ', auth);
  if (!auth || auth.admin === 0) {
    console.log('lefut a render ág');
    return res.render('error-page', {
      title: 'Nem-nem :)',
    });
  } else if (auth && auth.admin === 1) {
    next();
  }
});

/**
 * Executes POST requests at http://localhost:3000/tablename
 */
router.post('/:table', async (req, res) => {
  res.json(await database.createRecord(req.params.table, req.body));
});

/**
 * Answers GET requests at http://localhost:3000/api/tablename/querystring
 */
router.get('/:table', async (req, res) => {
  res.json(await database.readRecord(req.params.table, req.query));
});

/**
 * Gets a specific product from the database, based on seo property.
 */
router.get('/:table/:seo', async (req, res) => {
  const result = await database.readRecord(req.params.table, {
    seo: req.params.seo,
  });
  res.json(result[0]);
});

/**
 * Executes PUT requests at http://localhost:3000/tablename
 */
router.put('/:table', async (req, res) => {
  res.json(await database.updateRecord(req.params.table, req.query, req.body));
});

/**
 * Runs DELETE requests from http://localhost:3000/api/tablename/querystring
 */
router.delete('/:table/', async (req, res) => {
  res.json(await database.deleteRecord(req.params.table, req.query));
});

module.exports = router;
