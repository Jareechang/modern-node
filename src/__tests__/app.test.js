import registerApp from '../';
import request from 'supertest';
import api from '../api';

let app = null;
const PORT = 3333;

beforeAll(() => {
    app = registerApp(PORT);
});

async function requestJSON(url) {
    const res = await request(app).get(url).set('Accept', 'application/json')
    return res;
}

describe('Express App', () => {
    describe('/users', () => {
        it('should respond successfully with the users', async() => {
            const res = await requestJSON('/users');
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(api.users);
        });
    });
});
