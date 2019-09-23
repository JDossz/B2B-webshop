const BetagDB = require('./../webshop-mariadb');
const betagDB = new BetagDB();

module.exports = class PugData {

  /**
   * 
   * @param {Object} req: Request Object. 
   */
  constructor(req) {
    this.pathName = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const urlParts = this.pathName.split('/');
    this.seoName = urlParts[urlParts.length - 1];
    this.tableName = urlParts[urlParts.length - 2];
  }

  async readRecordBySeoName() {
    return await betagDB.readRecord(this.tableName, {
      seo: this.seoName,
    })
  }

  async readAllRecords() {
    return await betagDB.readRecord(this.tableName, {});
  }

}
