const BetagDB = require('./../webshop-mariadb');

const betagDB = new BetagDB();

module.exports = class PugData {

  constructor() {}

  async readRecordBySeoName(req) {
    this.pathName = $ {
        req.protocol
      }: //${req.get('host')}${req.originalUrl};
      const urlParts = this.pathName.split('/');
    this.seoName = urlParts[urlParts.length - 1];
    this.tableName = urlParts[urlParts.length - 2];
    return await betagDB.readRecord(this.tableName, {
      seo: '${this.seoName}',
    });
  }

  async readAllRecords(req) {
    this.pathName = $ {
        req.protocol
      }: //${req.get('host')}${req.originalUrl};
      const urlParts = this.pathName.split('/');
    this.tableName = urlParts[urlParts.length - 1];
    return await betagDB.readRecord(this.tableName, {});
  }

  async readSpecificTable(tableName, query = {}) {
    return await betagDB.readRecord(tableName, query);
  }
};
