import express from 'express';
import { registeredUser, loginUser } from '../controller/userController.js';
import { createProduct, getProduct,getUserProduct } from '../controller/productController.js';
import authenticate from '../middleware/authMiddleWare.js';
import refreshToken from '../middleware/refreshToken.js';
import placeOrder from '../controller/orderController.js';


const router = express.Router();

router.post('/register', registeredUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

router.post('/createProduct', authenticate, createProduct);
router.get('/getProduct', authenticate, getProduct);
router.get('/getUserProduct', authenticate, getUserProduct);

router.post('/orders', authenticate, placeOrder);


export default router;
