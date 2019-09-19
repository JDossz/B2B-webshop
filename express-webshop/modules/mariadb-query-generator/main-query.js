const mariadb = require('mariadb');
const pool = mariadb.createPool({
  database: 'betag',
  user: 'root',
  password: 'root',
  connectionLimit: 5,
});
const Updateer = require('./generators/put');
const updateer = new Updateer();

module.exports = class MainQuery {

  constructor() {
    pool.getConnection().then(conn => this.connection = conn);
  }

  async create() {

  }

  async read(table) {
    const id = 15;
    return await this.connection.query(`select * from ${table} where id = ${id}`);
  }

  /**
   * Updates the given record based on the URL query
   * @param {string} table Name of the table you want to update.
   * @param {string} where Conditions, when you want to update.
   * @param {string} set "set?condition1=value1&condition2=value2"
   */
  async update(table, where, set) {
    const setString = updateer.getSetString(where);
    const whereString = updateer.getWhereString(set);
    return await this.connection.query(`
      UPDATE ${table}
      SET ${setString}
      WHERE ${whereString};
    `);
  }

  /**
   * Deletes a record from the given table based on ID
   * @param {string} table: Name of the table, from which you want to delete
   * @param {string} query: "id=6" format, the id of the element you want to delete 
   */
  async delete(table, query) {
    return await this.connection.query(`
      DELETE FROM ${table}
      WHERE ${query};
    `);
  }

}
