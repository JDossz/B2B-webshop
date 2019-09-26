const mariadb = require('mariadb');
const pool = mariadb.createPool({
  user: 'root',
  password: 'root',
  database: 'betag'
})


module.exports = class UserHandlerSql {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }


  async readUser() {
    let sql = `
    SELECT * FROM users
    `
    let result = await this.conn.query(sql);
    return result;
  }

  async readOneUser(id) {
    let sql = `
  SELECT * FROM users
  WHERE id = ${id}
  `;
    let result = await this.conn.query(sql);
    return result;
  }

  async createUser(user) {
    let sql =
      `
      INSERT INTO users (admin, name, email, password, balance, address, picture)
      VALUES (
      ${user.admin},
      '${user.name}', 
      '${user.email}', 
      SHA1('${user.password}'), 
      ${user.balance}, 
      '${user.address}',
      '${user.picture}');
  `;

    let result = await this.conn.query(sql);
    return result;
  }
  async updateUser(user) {
    let sql =
      `
    UPDATE users 
    SET 
    admin = ${user.admin},
        name = '${user.name}', 
        email = '${user.email}',
        password ='${user.password}',
        balance = ${user.balance}, 
        address = '${user.address}', 
        picture = '${user.picture}'
        
    WHERE id = ${user.id}
    `;
    let result = await this.conn.query(sql);
    return result;
  }

  async deleteUser(id) {
    const sql = `
    DELETE FROM users
    WHERE id=${id}
    `
    let result = await this.conn.query(sql);
    return result;
  }
};
