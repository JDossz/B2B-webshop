describe('Testing set-generator.js', () => {

  const SetGenerator = require('./../modules/webshop-mariadb/tools/set-generator');
  const sg = new SetGenerator();

  it('should have a getSetString method', () => {
    expect(sg.getSetString).toBeDefined();
  });

  it('getSetString should return a list of the query object key-value pairs', () => {
    const result = sg.getSetString({
      name: 'Teszteset',
      admin: 0,
    });
    expect(result).toEqual("name='Teszteset', admin=0");
  });

});
