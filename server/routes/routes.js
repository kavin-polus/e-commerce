import express from 'express';
import { registeredUser, loginUser } from '../controller/userController.js';
import { createProduct, deleteProduct, getProduct,getUserProduct, updateProduct } from '../controller/productController.js';
import authenticate from '../middleware/authMiddleWare.js';
import refreshToken from '../middleware/refreshToken.js';
import  {placeOrder, orderHistoryCheck } from '../controller/orderController.js';
import { addItem, getCart, removeItem, updateQuantity } from '../controller/cartController.js';


const router = express.Router();

router.post('/register', registeredUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);

router.post('/createProduct', authenticate, createProduct);
router.get('/getProduct', authenticate, getProduct);
router.get('/getUserProduct', authenticate, getUserProduct);
router.put('/updateProduct', authenticate, updateProduct);
router.delete('/deleteProduct/:userId', authenticate, deleteProduct);

router.post('/orders', authenticate, placeOrder);

router.get('/getCart/:userId', authenticate, getCart)
router.post('/addItem',authenticate, addItem)
router.delete('/removeItem', authenticate, removeItem);
router.put('/updateQuantity', authenticate, updateQuantity);

router.get('/orderHistory/:userId', authenticate, orderHistoryCheck)


export default router;
