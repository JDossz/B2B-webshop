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
    const query = `INSERT INTO ${tableName} (${listGenerator.getFieldNames(data)}) VALUES (${listGenerator.getFieldValues(data)})`;
    return await this.connection.query(query.concat(';'));
  }

  /**
   * Concats the query and reads the MySQL database table accordingly.
   * @param {string} tableName The MySQL table, you want to read from.
   * @param {req.query} queryObject The request URL query string object.
   * @returns The read data from your MySQL database.
   */
  async readRecord(tableName, queryObject = {}) {
    return await this.connection.query(queryGenerator.getQueryString(tableName, queryObject));
  }

  /**
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

  async readRecordWithLike(req) {
    const sql = `
    SELECT *
    FROM projects
    WHERE title LIKE '%${req.query.search}%' OR contact LIKE '%${req.query.search}%'`;
    const result = await this.connection.query(sql);
    return result;
  }

  async readProjectsByCategory(category) {
    const sql = `
    SELECT *
    FROM projects
    INNER JOIN categories
    ON projects.categoryid=categories.id
    WHERE category='${category}' AND isactive=1`;
    const result = await this.connection.query(sql);
    return result;
  }

  async previousOrders(req) {
    const sql = `
    SELECT COUNT(DISTINCT projectid) as allDonatedProjects
    FROM orderdetails
    INNER JOIN projects ON projects.id = orderdetails.projectid 
    INNER JOIN orders ON orders.id = orderdetails.orderid 
    INNER JOIN users ON users.id = orders.userid
    WHERE users.id = ${req.user.id}`;

    const result = await this.connection.query(sql);
    return result;
  }

  async previousOrdersByProjectName(req) {
    const sql = `
    SELECT DISTINCT projects.title
    FROM orderdetails
    INNER JOIN projects ON projects.id = orderdetails.projectid 
    INNER JOIN orders ON orders.id = orderdetails.orderid 
    INNER JOIN users ON users.id = orders.userid
    WHERE users.id = ${req.user.id}
    ORDER BY orders.insdate DESC
    LIMIT 3
   `
      ;


    const result = await this.connection.query(sql);
    return result;
  }

  async previousOrdersByOneProjectName(req) {
    const sql = `
    SELECT DISTINCT projects.title
    FROM orderdetails
    INNER JOIN projects ON projects.id = orderdetails.projectid 
    INNER JOIN orders ON orders.id = orderdetails.orderid 
    INNER JOIN users ON users.id = orders.userid
    WHERE users.id = ${req.user.id}
    ORDER BY orders.insdate DESC
    LIMIT 1
   `
      ;


    const result = await this.connection.query(sql);
    return result;
  }

  async previousOrdersByTwoProjectName(req) {
    const sql = `
    SELECT DISTINCT projects.title
    FROM orderdetails
    INNER JOIN projects ON projects.id = orderdetails.projectid 
    INNER JOIN orders ON orders.id = orderdetails.orderid 
    INNER JOIN users ON users.id = orders.userid
    WHERE users.id = ${req.user.id}
    ORDER BY orders.insdate DESC
    LIMIT 2
   `
      ;


    const result = await this.connection.query(sql);
    return result;
  }


  async listOfPreviousOrders(req) {
    const sql = `
    SELECT orderid, 
    projects.title, 
    orders.quantity,
    orders.insdate
    FROM projects 
    INNER JOIN orderdetails ON projects.id = orderdetails.projectid 
    INNER JOIN orders ON orders.id = orderdetails.orderid 
    INNER JOIN users ON users.id = orders.userid
    WHERE users.id = ${req.user.id}`;
    const result = await this.connection.query(sql);
    return result;
  }

  async basketNumber(req) {
    const sql = `
    SELECT SUM(baskets.quantity) as totalQuantity
    FROM baskets 
    WHERE userid = ${req.user.id}
   `;


    const result = await this.connection.query(sql);
    return result;
  }
};

