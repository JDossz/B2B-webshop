  describe('Testin query-generator.js', () => {

    const QueryGenerator = require('./../modules/webshop-mariadb/tools/query-generator');
    const qg = new QueryGenerator();

    it('should have a getQueryString method', () => {
      expect(qg.getQueryString).toBeDefined();
    });

    it('should generate an appropriate query from non-special keys', () => {
      let result = qg.getQueryString('users', {
        id: 6,
        name: 'Teszt Aladár',
        admin: 0,
      }).replace(/\s{1,}/g, ' ');
      expect(result).toEqual("SELECT * FROM users WHERE id = 6 AND name = 'Teszt Aladár' AND admin = 0;".replace(/\s{1,}/g, ' '));
    });

    it('should generate an appropriate query if all options are specified', () => {
      const result = qg.getQueryString('users', {
        select: 'MAX(tesztoszlop)',
        from: 'INNER JOIN projects ON users.id = projects.userid',
        groupBy: 'category',
        having: 'tesztcondition1 = 0',
        orderBy: 'price DESC',
        limit: 6,
        betweenColumn: 'price',
        betweenValues: '3 and 7',
        admin: 0,
      }).replace(/\s{1,}/g, ' ');
      expect(result).toEqual('SELECT MAX(tesztoszlop) FROM users INNER JOIN projects ON users.id = projects.userid WHERE admin = 0 AND price BETWEEN 3 and 7 GROUP BY category HAVING tesztcondition1 = 0 ORDER BY price DESC LIMIT 6;');
    });

  });
