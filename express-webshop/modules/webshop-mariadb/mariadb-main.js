const mariadb = require('mariadb');
const pool = mariadb.createPool({
  database: 'betag',
  user: 'root',
  password: 'root',
  connectionLimit: 5,
});

const WhereGenerator = require('./tools/where-generator');
const whereGenerator = new WhereGenerator();

module.exports = class BetagDB {

  constructor() {
    pool.getConnection().then(conn => this.connection = conn);
  }

  async createRecord() {

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

  async updateRecord() {

  }

  /**
   * Concats the query and deletes the given record from your MySQL table.
   * @param {string} tableName The MySQL table, you want to read from.
   * @param {queryObject} queryObject The request URL query string object.
   * @returns {undefined} If your query object doesn't include any conditions
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
