const mariadb = require('mariadb');
const pool = mariadb.createPool({
  database: 'betag',
  user: 'root',
  password: 'ROOT',
  connectionLimit: 5,
});

const WhereGenerator = require('./tools/where-generator');
const whereGenerator = new WhereGenerator();
const ListGenerator = require('./tools/list-generator');
const listGenerator = new ListGenerator();
const SetGenerator = require('./tools/set-generator');
const setGenerator = new SetGenerator();

module.exports = class BetagDB {

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
    let query = `INSERT INTO ${tableName} (${listGenerator.getFieldNames(data)}) 
                 VALUES (${listGenerator.getFieldValues(data)})`;
    return await this.connection.query(query.concat(';'));
  }

  /**
   * Concats the query and reads the MySQL database table accordingly.
   * @param {string} tableName The MySQL table, you want to read from. 
   * @param {req.query} queryObject The request URL query string object.
   * @returns The read data from your MySQL database. 
   */
  async readRecord(tableName, queryObject) {
    let query = `SELECT * FROM ${tableName}`;
    query = query.concat(whereGenerator.getWhereString(queryObject));
    return await this.connection.query(query.concat(';'));
  }

  /**
   * Updates the values of an existing record.
   * @param {*} tableName The MySQL table, where you want to change a record
   * @param {req.query} queryObject The URL query string object.
   * @param {req.body} data The data to be changed in your table.
   * @returns The result of your update query 
   */
  async updateRecord(tableName, queryObject, data) {
    let query = `UPDATE ${tableName} SET ${setGenerator.getSetString(data)}`;
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

}
