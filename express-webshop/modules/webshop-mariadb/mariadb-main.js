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
    pool.getConnection().then(
      conn => this.connection = conn
    );
  }

  async createRecord() {

  }

  async readRecord(table, urlQuery) {
    let query = `
      SELECT * FROM ${table}
    `;
    console.log(urlQuery);
    query = query.concat(whereGenerator.getWhereString(urlQuery));
    return await this.connection.query(query.concat(';'));
  }

  async updateRecord() {

  }

  async deleteRecord(table, id) {
    return await this.connection.query(`
      DELETE FROM ${table};
      WHERE id=${id};
    `);
  }

}
