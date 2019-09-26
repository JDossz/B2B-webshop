const fs = require('fs');
const BetagDB = require('./../webshop-mariadb');

const database = new BetagDB();

module.exports = class RequestLogger {

  constructor(logPath = './../log') {
    this.logPath = logPath;
  }

  /**
   * Sets the path of the log folder.
   * @param {string} path the path to the path folder.
   */
  setLoggerDirectory(path) {
    this.logPath = path
  }

  /**
   * Logs Database queries to the hard drive.
   * @param {Object} queryResult Result of the database query. It will be used to log the request to the hard drive. 
   */
  logRequest(queryResult) {
    this._setCurrentQuery(queryResult);
    this._setup();
  }

  _setup() {
    this._identifyUserByCookies();
    this._createFolders();
    this._createLogFileByDate();
  }

  _setCurrentQuery(queryResult) {

  }

  _identifyUserByCookies() {

  }

  _createFolders() {
    const date = new Date();
    this._createDirectoryIfNeeded();
    this._createDirectoryIfNeeded(`${this.logPath}/${date.getFullYear()}`);
    this._createDirectoryIfNeeded(`${this.logPath}/${date.getFullYear()}/${date.getMonth() + 1}`);
  }

  _createLogFileByDate() {

  }

  _createDirectoryIfNeeded(path = this.logPath) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

}
