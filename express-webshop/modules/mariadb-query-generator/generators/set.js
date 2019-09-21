const Where = require('./where');

module.exports = class Set extends Where {

  constructor() {
    super();
    this.setString = '';
  }

  /**
   * Generates a partial MySQL query for the SET statement.
   * @param {string} query URL query string eg. "set?name=John&age=6"
   * @returns {string} A MySQL compatible SET string
   */
  getSetString(query) {
    this._generateSet(query);
    return this.setString;
  }

  _generateSet(query) {
    this._splitQueryIntoConditions(query).forEach(element => {
      this.setString = this.setString.concat(this._concatArrayIntoSQLQuery(element));
    });
    this.setString = this.setString.replace(/,\s$/, '');
  }

}
