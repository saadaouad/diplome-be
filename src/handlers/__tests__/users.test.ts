import * as users from '../users';

describe('User handler', () => {
    it('Should create a new user', async () => {
        const req = { body: { username: 'Saad', password: 'admin' } };
        const res = { json({ token }) {
            expect(token).toBeTruthy();
        }};

        await users.createNewUser(req, res, () => {});
    });
});
