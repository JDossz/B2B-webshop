describe('Testing pug-data.js', () => {

  const PugData = require('./../modules/pug-data');
  const pd = new PugData();

  it('should have a readRecordBySEO method', () => {
    expect(pd.readRecordBySEO).toBeDefined();
  });

  it('should have a readAllRecordsByURL', () => {
    expect(pd.readAllRecordsByURL).toBeDefined();
  });

  it('readRecordBySEO should return one record', async () => {
    const req = {
      originalUrl: 'http://localhost:3000/projects/test-seo',
    }
    const result = await pd.readRecordBySEO(req);
    expect(result[0].pictureurl).toEqual('/images/projects/sub.png');
  });

  it('readAllRecordsByURL should return one record', async () => {
    const req = {
      originalUrl: 'http://localhost:3000/users',
    }
    const result = await pd.readAllRecordsByURL(req);
    expect(result.length).toEqual(5);
  });

});
