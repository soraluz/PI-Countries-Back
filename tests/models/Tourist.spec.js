const { TouristActivity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('TouristActivity model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => TouristActivity.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        TouristActivity.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        TouristActivity.create({ name: 'Ski' });
      });
      it('should throw an error if difficulty is not in range ', (done) => {
        TouristActivity.create({ name: 'Rafting',difficulty:6 })
        .then(()=> done(new Error('It requires a valid difficulty')))
        .catch(()=>done())
      });
      it('should throw an error if season is not valid ', (done) => {
        TouristActivity.create({ name: 'Futbol',season:'Calor' })
        .then(()=> done(new Error('It requires a valid season')))
        .catch(()=>done())
      });
    });
  });
});