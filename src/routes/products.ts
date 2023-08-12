import { Router } from 'express';
import { body } from 'express-validator';

import { handleInputErrors } from '../modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from '../handlers/products';

const products = Router();

products.get('/products', getProducts);
products.get('/products/:id', getOneProduct);
products.post('/products', body('name').isString(),  handleInputErrors, createProduct);
products.put('/products/:id', body('name').isString(),  handleInputErrors, updateProduct);
products.delete('/products/:id', deleteProduct);

export default products;
