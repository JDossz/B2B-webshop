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

/**
 * 
 */
router.get('/:from/:query', async (req, res) => {
  const table = req.params.from;
  const result = await queryGenerator.read(table);
  res.json(result);
});

/**
 * Post request Handler
 * /:table/fields?field1&field2&field3/values?val1&val2&val3
 */
router.post('/:from/:fields/:values', async (req) => {
  const table = req.params.table;
  const insertInto = req.params.fields;
  const values = req.params.values;
  return await queryGenerator.create(table, insertInto, values);
})

/**
 * Put request Handler
 * /:table/where?id=7/set?admin=1&name=Jani
 */
router.put('/:from/:where/:set', async (req) => {
  const table = req.params.table;
  const where = req.params.where;
  const set = req.params.set;
  await queryGenerator.update(table, where, set);
});

/**
 * Delete request Handler
 * /:table/where?condition1=value1&condition2=value2
 */
router.delete('/:from/:where', async (req) => {
  const table = req.params.from;
  const queryString = req.params.where;
  await queryGenerator.delete(table, queryString);
});

module.exports = router;
