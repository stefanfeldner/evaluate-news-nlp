const app = require('../server/index');
const supertest = require('supertest');
const request = supertest(app);
import "babel-polyfill";

describe('Post endpoint', () => {
  it('/getData', async done => {
    const response = await request.get('/getData');
    expect(response.status).toBe(200);
    done();
  });
});