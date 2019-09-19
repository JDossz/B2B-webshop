const mariadb = require('mariadb');
const pool = mariadb.createPool({
  database: 'betag',
  user: 'root',
  password: 'root',
  connectionLimit: 5,
});

module.exports = class MainQuery {

  constructor() {
    pool.getConnection().then(conn => this.connection = conn);
  }

  async create() {

  }

  async read() {
    const id = 15;
    return await this.connection.query(`select * from projects where id = ${id}`);
  }

  async update() {

  }

  async delete() {}

}
