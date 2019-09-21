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
  const query = req.params.query;
  const table = req.params.from;
  const result = await queryGenerator.read(table, query);
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
router.put('/:from/:id', async (req) => {

});

/**
 * Delete request Handler
 * /:table/where?condition1=value1&condition2=value2
 */
router.delete('/:from/:id', async (req) => {
  const table = req.params.from;
  const id = Number.parseInt(req.params.id, 10);
  const result = await queryGenerator.delete(table, id);
  res.json(result);
});

module.exports = router;
