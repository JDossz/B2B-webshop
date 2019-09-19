const mariadb = require('mariadb');

const pool = mariadb.createPool({
  user: 'root',
  password: 'ROOT',
  database: 'betag',
  connectionLimit: 5,
});

module.exports = class DB {
  constructor() {
    pool.getConnection().then(conn => this.conn = conn);
  }

  async read(id) {
    let sql = 'SELECT * FROM projects';
    if (id) {
      sql += `
       WHERE id=${id}`;
    }
    const result = await this.conn.query(sql);
    return result;
  }

  async create(project) {
    const sql = `
    INSERT INTO projects
    (title,seo,price,contact,link,category,shortd,longd,picture,institution)
    VALUES
    ('${project.title}','${project.seo}',${project.price},'${project.contact}','${project.link}','${project.category}','${project.shortd}','${project.longd}','${project.picture}','${project.institution}')`;
    const result = await this.conn.query(sql);
    return result;
  }


  async update(project) {
    const sql = `
    UPDATE projects
    SET title='${project.title}',seo='${project.seo}',price=${project.price},contact='${project.contact}',link='${project.link}',category='${project.category}',shortd='${project.shortd}',longd='${project.longd}',picture='${project.picture}',institution='${project.institution}'
    WHERE id=${project.id}`;
    const result = await this.conn.query(sql);
    return result;
  }

  async delete(id) {
    const sql = `
DELETE FROM projects
WHERE id=${id}`;
    const result = await this.conn.query(sql);
    return result;
  }
};
