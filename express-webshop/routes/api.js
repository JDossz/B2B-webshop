var express = require('express');
var router = express.Router();

const Database = require('./../modules/webshop-mariadb');
const database = new Database();

/**
 * Executes POST requests at http://localhost:3000/tablename
 */
router.post('/:table', async (req, res) => {
  res.json(req.body);
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
  res.json(await database.readRecord(req.params.table, {
    "seo": req.params.seo,
  }))
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
