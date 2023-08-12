import prisma from '../db';

export const getProducts = async (req, res) => {
    const user = await prisma.users.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    });

    res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
    const id = req.params.id;

    const product = await prisma.products.findFirst({
        where: {
            id,
            belongsToId: req.user.id,
        }
    });

    res.json({ data: product });
};

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.products.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id,
            }
        });
    
        res.json({ data: product });
    } catch (e) {
        next(e);
    }
};

export const updateProduct = async (req, res) => {
    const updated = await prisma.products.update({
        where: {
            id: req.params.id,
        },
        data: {
            name: req.body.name,
        }
    });

    res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.products.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    });

    res.json({ data: deleted });
};
