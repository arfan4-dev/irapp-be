import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';
import {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategoryLabel,
    addItemToCategory,
    removeItemFromCategory
} from '../controllers/category.controller.js';
import {
    createOrder,
    getAllOrders,
    updateOrderStatus,
} from '../controllers/order.controller.js';
const router = express.Router();

// Auth routes
router.post('/user', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/verify', userController.verifyEmail);
router.post('/logout', userController.logoutUser);
router.get('/refresh-token', userController.refreshToken);
router.put('/update-user/:id', userController.updateUser);
// ✅ Protected route
router.get('/:id', authMiddleware, userController.getUser);

// Category routes
router.post('/categories', createCategory);                   // POST /api/category
router.get('/', getAllCategories);                  // GET /api/category
router.delete('/categories/:id', deleteCategory);              // DELETE /api/category/:id
router.put('/categories/:id', updateCategoryLabel);            // PUT /api/category/:id
router.post('/categories/:id/items', addItemToCategory);       // POST /api/category/:id/items
router.delete('/categories/:id/items', removeItemFromCategory);// DELETE /api/category/:id/items

// Order routes
router.post('/order', createOrder);
router.get('/order/:id', getAllOrders);
router.put('/order/:id', updateOrderStatus);
export default router;
