import { Router } from 'express';

import { createNewUser, signin } from '../handlers/users';

const users = Router();

users.post('/users', createNewUser);
users.post('/sign-in', signin);

export default users;
