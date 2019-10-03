describe('Testing mariadb-main', () => {

  const BetagDB = require('./../modules/webshop-mariadb');
  const db = new BetagDB();

  it('should have a createRecord method', () => {
    expect(db.createRecord).toBeDefined();
  });

  it('should have a readRecord method', () => {
    expect(db.readRecord).toBeDefined();
  });

  it('should have an updateRecord method', () => {
    expect(db.updateRecord).toBeDefined();
  });

  it('should have a deleteRecord method', () => {
    expect(db.deleteRecord).toBeDefined();
  });

  it('readRecord should return an element by ID', async () => {
    const result = await db.readRecord('users', {
      id: 3
    });
    expect(result[0].emailaddress).toEqual('olah.daniel95@gmail.com');
  });

  it('readRecord should be undefined if no record is found', async () => {
    const result = await db.readRecord('users', {
      firstname: 'Non existing user',
    });
    expect(result[0]).not.toBeDefined();
  });

  it('readRecord should return multiple values if conditions are met.', async () => {
    const result = await db.readRecord('users', {
      admin: 1,
    });
    expect(result.length).toEqual(5);
  });

  it('deleteRecord should return undefined if no conditions are given', async () => {
    const result = await db.deleteRecord('users', {});
    expect(result).not.toBeDefined();
  });

  it('createRecord should create a record from the given object.', async () => {
    await db.createRecord('users', {
      firstname: 'Béla',
      lastname: 'Bélapátfalvi',
      username: 'TesztBela',
      emailaddress: 'teszt.bela@gmail.com',
      password: 'tesztelek',
    });
    const result = await db.readRecord('users', {
      lastname: 'Bélapátfalvi',
      admin: 0,
    });
    expect(result[0].lastname).toEqual('Bélapátfalvi');
  });

  it('deleteRecord should remove all test users', async () => {
    await db.deleteRecord('users', {
      firstName: 'Béla',
      lastName: 'Bélapátfalvi',
    });
    const result = await db.readRecord('users', {
      firstName: 'Béla',
      lastName: 'Bélapátfalvi',
    });
    expect(result[0]).not.toBeDefined();
  });

});
