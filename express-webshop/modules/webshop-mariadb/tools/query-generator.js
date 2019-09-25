module.exports = class QueryGenerator {

  constructor() {
    this.queryString = '';
  }

  getQueryString(tableName, queryObject = {}) {
    this._clearPreviousQuery();
    this._setMainTable(tableName);
    this._setQuery(queryObject);
    this._setQueryKeys(queryObject);
    if (this.query.select) {

    }
    if (this.query.join && this.query.secondJoin) {
      // 3 tables
    } else if (this.query.join) {
      // 2 tables
    } else {
      // 1 table
    }
    this.queryString = this.queryString.concat(`${/* WHERE */}`);
    if (this.query.groupBy) {

    }
    if (this.query.having) {

    }
    if (this.query.limit) {

    }
  }

  _clearPreviousQuery() {
    this.queryString = '';
  }

  _setMainTable(tableName) {
    this.tableName = tableName;
  }

  _setQuery(queryObject) {
    this.query = queryObject;
  }

  _setWhereKeys(queryObject) {
    this.whereKeys = Object.keys(queryObject);
    delete this.whereKeys.select;
    delete this.whereKeys.join;
    delete this.whereKeys.secondJoin;
    delete this.whereKeys.groupBy;
    delete this.whereKeys.having;
    delete this.whereKeys.limit;
  }

}
