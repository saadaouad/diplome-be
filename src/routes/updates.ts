import { Router } from 'express';
import { body } from 'express-validator';

import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from '../handlers/updates';

const updates = Router();

updates.get('/updates', getUpdates);
updates.get('/updates/:id', getOneUpdate);
updates.post('/updates', 
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
);
updates.put('/updates/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    updateUpdate
);
updates.delete('/updates/:id', deleteUpdate);

export default updates;
