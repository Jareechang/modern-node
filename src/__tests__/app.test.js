import request from 'supertest';
import registerApp from '../';
import api from '../api';

let app = null;
const PORT = 3333;

beforeAll(() => {
  app = registerApp(PORT);
});

async function requestJSON(url) {
  const res = await request(app).get(url).set('Accept', 'application/json');
  return res;
}

describe('Express App', () => {
  describe('/users', () => {
    it('should respond successfully with the users [status: 200]', async() => {
      const res = await requestJSON('/users');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual(api.users);
    });
  });

  describe('/google', () => {
    it('should respond with a redirect to google [status: 302]', async() => {
      const res = await requestJSON('/google');
      expect(res.status).toEqual(302);
      expect(res.header.location).toEqual(api.redirect.url);
    });
  });
});
