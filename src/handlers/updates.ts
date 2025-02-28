import prisma from '../db';

export const getUpdates = async (req, res) => {
    const products = await prisma.products.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
         return [...allUpdates, ...product.updates]
    }, []);

    res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
    const id = req.params.id;

    const update = await prisma.updates.findUnique({
        where: {
            id,
        }
    });

    res.json({ data: update });
};

export const createUpdate = async (req, res) => {
    const product = await prisma.products.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        return res.json({ message: 'Nope' });
    }

    const update = await prisma.updates.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: product }
        }
    });

    res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
    const products = await prisma.products.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
   }, []);

   const match = updates.find(update => update.id === req.params.id);

   if (!match) {
       return res.json({ message: 'Nope' });
   };

   const updatedUpdate = await prisma.updates.update({
       where: {
           id: req.params.id
       },
       data: req.body
   });

   res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
    const products = await prisma.products.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
   }, []);

   const match = updates.find(update => update.id === req.params.id);

   if (!match) {
       return res.json({ message: 'Nope' });
   };

   const deleted = await prisma.updates.delete({
       where: {
           id: req.params.id
       }
   });

   res.json({ data: deleted });
};
