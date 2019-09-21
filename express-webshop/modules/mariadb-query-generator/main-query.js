const mariadb = require('mariadb');
const pool = mariadb.createPool({
  database: 'betag',
  user: 'root',
  password: 'root',
  connectionLimit: 5,
});
const Adder = require('./generators/post');
const adder = new Adder();

const Set = require('./generators/set');
const converter = new Set();

module.exports = class MainQuery {

  constructor() {
    pool.getConnection().then(conn => this.connection = conn);
  }

  async create(table, insertInto, values) {
    const insertIntoString = adder.generateInsertIntoString(insertInto);
    const valuesString = adder.generateValuesString(values);

    const sql = `
                    INSERT INTO ${table}
                    (${insertIntoString})
                    VALUES
                    (${valuesString})
                    `;
    return await this.connection.query(sql);
  }

  /**
   * 
   * @param {string} table Name(s) of the table, which you want to read 
   * @param {*} query eg. "where?condition=valueorder?asc"
   */
  async read(table, query) {
    return await this.connection.query(`select * from ${table} where ${query}`);
  }

  /**
   * Updates the given record based on the URL query
   * @param {string} table Name of the table you want to update.
   * @param {string} where Conditions, when you want to update.
   * @param {string} set "set?condition1=value1&condition2=value2"
   */
  async update(table, where, set) {
    return await this.connection.query(`
      UPDATE ${table}
      SET ${converter.getSetString(where)}
      WHERE ${converter.getWhereString(set)};
    `);
  }

  /**
   * Deletes a record from the given table based on ID
   * @param {string} table: Name of the table, from which you want to delete
   * @param {string} id: "number" format. The id of the record you want to delete
   */
  async delete(table, id) {
    return await this.connection.query(`
      DELETE FROM ${table}
      WHERE id=${id};
    `);
  }

}
