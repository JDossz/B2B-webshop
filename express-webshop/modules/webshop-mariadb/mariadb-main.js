const mariadb = require('mariadb');

const pool = mariadb.createPool({
  database: 'betag',
  user: 'root',
  password: 'root',
  connectionLimit: 100,
});

const WhereGenerator = require('./tools/where-generator');
const ListGenerator = require('./tools/list-generator');
const SetGenerator = require('./tools/set-generator');
const QueryGenerator = require('./tools/query-generator');

const whereGenerator = new WhereGenerator();

const listGenerator = new ListGenerator();

const setGenerator = new SetGenerator();
const queryGenerator = new QueryGenerator();

module.exports = class BetagDB {

  /*
    Full select syntax:
    SELECT columns, AVG(column), SUM(column)
    FROM ((table1
      INNER JOIN table2 ON table1.id = table2.id )
      INNER JOIN table3 ON table1.id = table3.id
    )
    WHERE condition1 = value1 AND condition2 LIKE pattern
    GROUP BY column1
    HAVING condition
    LIMIT number

    queryObject:
    {
      select: * /'avg' / 'sum'
      join: tableName
      secondJoin: tableName
      groupBy: columnName
      having: condition
      limit: number
    }
  */

  constructor() {
    pool.getConnection().then(conn => this.connection = conn);
  }

  /**
   * Concats the query and adds a record to your MySQL database table.
   * @param {string} tableName The MySQL table, you want to post to.
   * @param {req.body} data The data to be inserted into the table.
   * @returns The result of your post query.
   */
  async createRecord(tableName, data) {
    console.log(data)
    const query = `INSERT INTO ${tableName} (${listGenerator.getFieldNames(data)}) VALUES (${listGenerator.getFieldValues(data)})`;
    return await this.connection.query(query.concat(';'));
  }

  /**
   * NE EZT HASZNÁLD, HA USER INPUTOT DOLGOZUNK FEL!
   * Concats the query and reads the MySQL database table accordingly.
   * @param {string} tableName The MySQL table, you want to read from.
   * @param {req.query} queryObject The request URL query string object.
   * @returns The read data from your MySQL database.
   */
  async readRecord(tableName, queryObject = {}) {
    // query = query.concat(whereGenerator.getWhereString(queryObject));
    // return await this.connection.query(queryGenerator.getQueryString(tableName, queryObject));
    // return query;
    // return queryGenerator.getQueryString(tableName, queryObject);
    return await this.connection.query(queryGenerator.getQueryString(tableName, queryObject));
  }

  /**
   * NE EZT HASZNÁLD, HA USER INPUTOT DOLGOZUNK FEL!
   * Updates the values of an existing record.
   * @param {string} tableName The MySQL table, where you want to change a record
   * @param {req.query} queryObject The URL query string object.
   * @param {req.body} data The data to be changed in your table.
   * @returns The result of your update query
   */
  async updateRecord(tableName, queryObject, data) {
    let query = `UPDATE ${tableName}
    SET ${setGenerator.getSetString(data)}`;
    query = query.concat(whereGenerator.getWhereString(queryObject));
    if (!query.includes('WHERE')) {
      return;
    }
    return await this.connection.query(query.concat(';'));
  }

  /**
   * Concats the query and deletes the given record from your MySQL table.
   * @param {string} tableName The MySQL table, you want to read from.
   * @param {queryObject} queryObject The request URL query string object.
   * @returns {undefined} If your query object doesn't include any conditions.
   * @returns {Promise} The result of your deletion query.
   */
  async deleteRecord(tableName, queryObject) {
    let query = `DELETE FROM ${tableName}`;
    query = query.concat(whereGenerator.getWhereString(queryObject));
    if (!query.includes('WHERE')) {
      return;
    }
    return await this.connection.query(query.concat(';'));
  }


  async checkLogin(req) {
    if (!req.cookies.userID) {
      return false;
    }

    const sql = `
  SELECT * 
  FROM users
  WHERE token='${req.cookies.userID}'`;

    const result = await this.connection.query(sql);
    return result[0];

  }
};
