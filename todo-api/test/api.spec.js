// Filename: api.spec.js  
// Timestamp: 2016.03.29-20:41:19 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application
//

const supertest = require('supertest');
const test = require('tape');
const app = require('../');
const api = supertest(app);

test('GET /health', t => {
  api
  .post('/save')
  .expect('Content-type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) {
      t.fail(err);
      t.end();
    } else {
      t.ok(res.body, 'It should have a response body');
      t.equals(res.body.success, true, 'It should return a healthy parameter and it should be true');
      t.end();
    }
  });
});
