module.exports = class SetWhere {

  constructor() {
    this.setString = '';
    this.whereString = '';
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

  /**
   * Generates a partial MySQL query for the WHERE condition.
   * @param {string} query URL query string eg. "where?id=5"
   * @returns {string} A MySQL compatible WHERE condition 
   */
  getWhereString(query) {
    this.emptyPreviosResult();
    this._generateWhere(query);
    return this.whereString;
  }

  _emptyPreviosResult() {
    this.setString = '';
    this.whereString = '';
  }

  _generateSet(query) {
    this._splitQueryIntoConditions(query).forEach(element => {
      this.setString = this.setString.concat(this._concatArrayIntoSQLQuery(element));
    });
    this.setString.replace(/,\s$/, '');
  }

  _generateWhere(query) {
    this._splitQueryIntoConditions(query).forEach(element => {
      this.whereString = this.whereString.concat(this._concatArrayIntoSQLQuery(element, ' AND '));
    });
    this.whereString.replace(/\sAND\s$/, '');
  }

  _splitQueryIntoConditions(query) {
    return [].concat(query.split('?')).shift().split('&');
  }

  _concatArrayIntoSQLQuery(element, andFormat = ', ') {
    return ''.concat(element.split('=')[0])
      .concat(' = ')
      .concat(element.split('=')[1])
      .concat(andFormat);
  }

}
