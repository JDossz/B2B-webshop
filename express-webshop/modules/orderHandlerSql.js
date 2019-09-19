const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: 'root',
  password: 'root',
  database: 'betag',
  connectionLimit: 5,
});

module.exports = class orderHandlerSql {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }

  async read() {
    const sql = 'SELECT * FROM orders';
    const result = await this.conn.query(sql);
    return result;
  }

  async readOne(id) {
    const sql = `
  SELECT * FROM orders
  WHERE id = ${id}
  `;
    const result = await this.conn.query(sql);
    return result;
  }

  async create(order) {
    const sql =
      `
    INSERT INTO orders (userid, insdate, projectid, projectprice, quantity, status)
    VALUES (
    ${order.userid}, 
    CURRENT_TIMESTAMP(),
    ${order.projectid}, 
    ${order.projectprice}, 
    ${order.quantity}, 
    ${order.status});
`;

    const result = await this.conn.query(sql);
    return result;
  }

  async update(order) {
    const sql =
      `
    UPDATE orders 
    SET 
        quantity =${order.quantity},
        status = ${order.status}
        
    WHERE id = ${order.id}
    `;
    const result = await this.conn.query(sql);
    return result;
  }

  async delete(id) {
    const sql = `
    DELETE FROM orders
    WHERE id=${id}
    `
    const result = await this.conn.query(sql);
    return result;
  }
};
