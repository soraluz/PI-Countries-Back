/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { TouristActivity, conn } = require('../../src/db.js');

const agent = session(app);

const acitivity ={
  name:'Sky',
}

describe('Activities routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => TouristActivity.sync({ force: true })
    .then(() => TouristActivity.create(acitivity)));

    describe('GET /activities', () => {
      it('responds with 200', () => agent.get('/activities').expect(200));
      it('responds with and object with nombre Sky', () =>
        agent.get('/activities').then((res) => {
          expect(res.body[0].name).to.equal('Sky');
        }));
    });

    describe('POST /activities', () => {
    it('should get 200', () =>
      agent.post('/activities').send({name:'Futbol'}).expect(200)
    );
  });

});