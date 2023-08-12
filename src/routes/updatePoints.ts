import { Router } from 'express';
import { body } from 'express-validator';

const updatePoints = Router();

updatePoints.get('/updatepoints', () => {});
updatePoints.get('/updatepoints/:id', () => {});
updatePoints.put('/updatepoints/:id', 
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => {}
);
updatePoints.post('/updatepoints',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => {}
);
updatePoints.delete('/updatepoints/:id', () => {});

export default updatePoints;
