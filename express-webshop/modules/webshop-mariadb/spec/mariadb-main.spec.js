describe('Testing mariadb-main.js', () => {

  const mariadb = require('mariadb');
  const pool = mariadb.createPool({
    database: 'betag',
    user: 'root',
    password: 'root',
    connectionLimit: 5,
  });

  const WhereGenerator = require('./../tools/where-generator');
  const SetGenerator = require('./../tools/set-generator');
  const ListGenerator = require('./../tools/list-generator');

  const whereGenerator = new WhereGenerator();
  const listGenerator = new ListGenerator();
  const setGenerator = new SetGenerator();

  const BetagDB = require('./../mariadb-main');
  const betagDB = new BetagDB();

  class Mock {
    constructor() {
      pool.getConnection().then(conn => this.onnection = conn);
      this.whereGenerator = whereGenerator;
      this.listGenerator = listGenerator;
      this.setGenerator = setGenerator;
    }
  }

  let data;

  beforeEach(async () => {
    const mock = new Mock();
    const db = betagDB.readRecord.bind(mock);
    data = await db('users', {
      id: 1
    })
  })

  it('readRecord should read the betag database', () => {
    expect(data).toEqual(jasmine.objectContaining({
      "id": 1,
      "admin": 0,
      "name": "Alis Egleton",
    }));

  });

});
