import cors from 'cors'
import express from 'express';
import morgan from 'morgan';

import { protect } from './modules/auth';
import users from './routes/users';
import products from './routes/products';
import updates from './routes/updates';
import updatePoints from './routes/updatePoints';

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.json({ message: 'Hello' });
});

app.use('/api', users);
app.use('/api', protect, products);
app.use('/api', protect, updates);
app.use('/api', protect, updatePoints);

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'Unauthorized' });
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'Invalid input' });
    } else {
        res.status(500).json({ message: 'Oops, thats on us' });
    }
});

export default app;
