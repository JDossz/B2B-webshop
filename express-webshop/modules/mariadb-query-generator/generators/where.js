const Joiner = require('./joiner');

module.exports = class Where extends Joiner {

  constructor() {
    super();
    this.whereString = '';
  }

}
