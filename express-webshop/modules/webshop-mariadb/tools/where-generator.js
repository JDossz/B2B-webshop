module.exports = class WhereGenerator {

  constructor() {
    this.whereString = '';
  }

  /**
   * 
   * @param {*} urlQuery 
   */
  getWhereString(urlQuery) {
    this._emptyPreviousQuery();
    this._setQuery(urlQuery);
    this._setQueryKeys();
    this._generateWhereString();
    return this.whereString;
  }

  _generateWhereString() {
    this.queryKeys.forEach((key, index) => {
      if (index !== 0) {
        this.whereString = this.whereString
          .concat(` AND`);
      }
      this.whereString = this.whereString
        .concat(` ${key} = ${this.query[key]}`);
    });
  }

  _emptyPreviousQuery() {
    this.whereString = ' WHERE ';
  }

  _setQuery(urlQuery) {
    this.query = urlQuery;
  }

  _setQueryKeys() {
    this.queryKeys = Object.keys(this.query);
  }

}
