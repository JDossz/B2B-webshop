describe('Testing list-generator.js', () => {

  const ListGenerator = require('./../modules/webshop-mariadb/tools/list-generator');
  const lg = new ListGenerator();

  it('getFieldNames should be defined', () => {
    expect(lg.getFieldNames).toBeDefined();
  });

  it('getFieldValues should be defined', () => {
    expect(lg.getFieldValues).toBeDefined();
  });

  it('getFieldNames should not include id and insdate values', () => {
    const result = lg.getFieldNames({
      id: 6,
      insdate: 1995,
      name: 'Sanyi',
      value: 6,
    });
    expect(result).toEqual('name, value');
  });

  it('getFieldValues should not include id and insdate values', () => {
    const result = lg.getFieldValues({
      id: 9,
      insdate: 'Sanyi',
      name: 'Tesztelek',
      admin: 0,
    });
    expect(result).toEqual("'Tesztelek', 0");
  });

  it('string values should be in single quotes', () => {
    const result = lg.getFieldValues({
      name: 'Tesztstring',
    });
    expect(result).toEqual("'Tesztstring'");
  });

  it('number values should not be in single quotes', () => {
    const result = lg.getFieldValues({
      admin: 1.
    });
    expect(result).toEqual('1');
  });

});
