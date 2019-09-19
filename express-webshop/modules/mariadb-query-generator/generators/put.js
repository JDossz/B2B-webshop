module.exports = class Updateer {

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
    this.generateSet(query);
    return this.setString;
  }

  /**
   * Generates a partial MySQL query for the WHERE condition.
   * @param {string} query URL query string eg. "where?id=5"
   * @returns {string} A MySQL compatible WHERE condition 
   */
  getWhereString(query) {
    this.generateWhere(query);
    return this.whereString;
  }

  generateSet(query) {
    // Splits the query into set? and the remainder
    query = query.split('?')
    query.shift();
    this.setString = this.setString.concat('SET ');
    // Parts the string at every given condition
    query = query.split('&');
    query.forEach(element => {
      // Element should look like: category=Chemistry
      this.setString = this.setString.concat(element.split('=')[0]);
      this.setString = this.setString.concat(' = ')
      this.setString = this.setString.concat(element.split('=')[1]);
    });
  }



}
