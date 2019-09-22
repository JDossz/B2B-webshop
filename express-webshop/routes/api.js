var express = require('express');
var router = express.Router();

const Database = require('./../modules/webshop-mariadb');
const database = new Database();

router.post('/:table', (req, res) => {

});

router.get('/', (req, res) => {
  res.json("Hello");
});

router.get('/:table', async (req, res) => {
  const table = req.params.table;
  const urlQuery = req.query;
  const result = await database.readRecord(table, urlQuery);
  res.json(result);
});

router.put('/:table', (req, res) => {

});

router.delete('/:table/:query', async (req, res) => {
  const table = req.params.table;
  const id = Number.parseInt(req.params.id, 10);
  const result = await database.deleteRecord(table, id);
  res.json(result);
});

module.exports = router;
