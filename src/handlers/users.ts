import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
    try {
        const hash = await hashPassword(req?.body?.password);

        const user = await prisma.users.create({
            data: {
                username: req.body.username,
                password: hash,
            },
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        e.type = 'input';
        next(e);
    }
};

export const signin = async (req, res) => {
    const user = await prisma.users.findUnique({
        where: { username: req.body.username },
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.json({ message: 'Nope' });
        return;
    };

    const token = createJWT(user);
    res.json({ token });
};
