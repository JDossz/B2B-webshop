var express = require('express');
var router = express.Router();

const MainQuery = require('./../modules/mariadb-query-generator');
const queryGenerator = new MainQuery();

/**
 * Get request Handler
 */
router.get('/', (req, res, next) => {
  res.json('Hello.');
});

router.get('/:query', async (req, res, next) => {
  const table = req.params.query;
  const result = await queryGenerator.read(table);
  res.json(result);
});

/**
 * Post request Handler
 */
router.post('/', (req, res, next) => {

});

/**
 * Put request Handler
 * /users/where?id=7/set?admin=1&name=Jani
 */
router.put('/:table/:where/:set', (req, res) => {
  const table = req.params.table;
  const where = req.params.where;
  const set = req.params.set;
  queryGenerator.update(table, where, set);
});

/**
 * Delete request Handler
 */
router.delete('/:table/:query', (req, res) => {
  const table = req.params.table;
  const queryString = req.params.query;
  queryGenerator.delete(table, queryString);
});

module.exports = router;
