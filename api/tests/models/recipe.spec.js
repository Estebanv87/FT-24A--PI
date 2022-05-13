const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ title: 'Milanesa a la napolitana' });
      });
    });
      describe('Score', () => {
        it('should throw an error if spoonacularScore is null', (done) => {
          Recipe.create({})
            .then(() => done(new Error('It requires a valid spoonacularScore')))
            .catch(() => done());
        });
        it('should work when spoonacularScore is a number', () => {
          Recipe.create({ spoonacularScore: 50 });
        });
      });
      describe('Health Score', () => {
        it('should throw an error if healthScore is null', (done) => {
          Recipe.create({})
            .then(() => done(new Error('It requires a valid healthScore')))
            .catch(() => done());
        });
        it('should work when healthScore is a number', () => {
          Recipe.create({ healthScore: 80 });
        });
      });
      describe('Summary', () => {
        it('should throw an error if summary is null', (done) => {
          Recipe.create({})
            .then(() => done(new Error('It requires a valid summary')))
            .catch(() => done());
        });
        it('should work when summary is a valid text', () => {
          Recipe.create({ summary: 'Carne asada a la parrilla' });
        });
      });
    });
  });