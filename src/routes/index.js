import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

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

export default router;
