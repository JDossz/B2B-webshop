module.exports = class Joiner {

  constructor() {
    this.fromString = '';
  }

  /**
   * 
   * @param {string} table eg. /
   * @returns {string} A MySQL compatible statment for table name, or joined table names. 
   */
  getFromString(table) {
    if (/^n\?/.test(table)) {
      this._shiftJoinType(table);
    }
    if (/^i\?/.test(table)) {
      this._getInnerJoin(table);
    }
    if (/^l\?/.test(table)) {
      this._getLeftOuterJoin(table);
    }
    if (/^r\?/.test(table)) {
      this._getRightOuterJoin(table);
    }
    if (/^f\?/.test(table)) {
      this._getFullOuterJoin(table);
    }
    return this.fromString;
  }

  _getInnerJoin(table) {
    table = this._shiftJoinType(table).split('&');
    this.fromString = `${table[0]} INNER JOIN ${table[1]}`;
  }

  _getLeftOuterJoin(table) {
    table = this._shiftJoinType(table).split('&');
    this.fromString = `${table[0]} LEFT OUTER JOIN ${table[1]}`;

  }

  _getRightOuterJoin(table) {
    table = this._shiftJoinType(table).split('&');
    this.fromString = `${table[0]} RIGHT OUTER JOIN ${table[1]}`;
  }

  _getFullOuterJoin(table) {
    table = this._shiftJoinType(table).split('&');
    this.fromString = `${table[0]} FULL OUTER JOIN ${table[1]}`;
  }

  _shiftJoinType(table) {
    this.fromString = table.replace(/^[nilrf]\?/, '');
  }

}
