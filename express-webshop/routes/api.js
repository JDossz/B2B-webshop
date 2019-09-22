var express = require('express');
var router = express.Router();

const Database = require('./../modules/webshop-mariadb');
const database = new Database();

router.post('/:table', (req, res) => {

});

/**
 * Answers GET requests at http://localhost:3000/api/tablename/querystring
 */
router.get('/:table', async (req, res) => {
  res.json(await database.readRecord(req.params.table, req.query));
});

router.put('/:table', (req, res) => {

});

/**
 * Runs DELETE requests from http://localhost:3000/api/tablename/querystring
 */
router.delete('/:table/', async (req, res) => {
  res.json(await database.deleteRecord(req.params.table, req.query));
});

module.exports = router;
