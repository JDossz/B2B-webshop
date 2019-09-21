module.exports = class Where {

  constructor() {
    this.whereString = '';
  }

  /**
   * Generates a partial MySQL query for the WHERE condition.
   * @param {string} query URL query string eg. "where?id=5"
   * @returns {string} A MySQL compatible WHERE condition 
   */
  getWhereString(query) {
    this._generateWhere(query);
    return this.whereString;
  }

  _generateWhere(query) {
    this._splitQueryIntoConditions(query).forEach(element => {
      this.whereString = this.whereString.concat(this._concatArrayIntoSQLQuery(element, ' AND '));
    });
    this.whereString = this.whereString.replace(/\sAND\s$/, '');
  }

  _splitQueryIntoConditions(query) {
    return [].concat(query.split('?'))[1].split('&');
  }

  _concatArrayIntoSQLQuery(element, andFormat = ', ') {
    return ''.concat(element.split('=')[0])
      .concat(' = ')
      .concat(element.split('=')[1])
      .concat(andFormat);
  }

}
