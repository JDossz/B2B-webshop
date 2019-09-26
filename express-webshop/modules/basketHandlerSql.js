const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: 'root',
  password: 'Renoir123',
  database: 'betag',
  connectionLimit: 5,
});


module.exports = class BasketHandlerSql {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }


  async readOne(user) {
    const sql = `
  SELECT * FROM orders
  WHERE userid = ${user.id}
  `;
    const result = await this.conn.query(sql);
    return result;
  }


  async readCartForUser(user) {

    if (req.cookies.uuid) {
      let sql = `
      
    SELECT users.id, 
    projects.title, 
    projects.price, 
    carts.quantity 
    FROM users JOIN carts ON users.id = carts.userid 
    JOIN projects ON projects.id=carts.projectid 
    WHERE users.id = ${user.id}
      `;
      let result = await this.conn.query(sql);
      return result;
    }

  }
}