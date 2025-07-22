import express from 'express';
import upload from '../middlewares/multer.middleware.js';
import { createDefaultAdmin, userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategoryLabel,
    addItemToCategory,
    removeItemFromCategory,
    updateItemInCategory,
    updateCategoryDepartments
} from '../controllers/category.controller.js';
import {
    createOrder,
    getAllOrders,
    getOrdersForStaff,
    updateOrderStatus,
} from '../controllers/order.controller.js';
import { getSiteConfig, updateSiteConfig } from '../controllers/siteConfig.controller.js';
import { createDepartment, deleteDepartment, getAllDepartments, updateDepartment } from '../controllers/department.controller.js';
import { getEmailSettings, updateEmailSettings } from '../controllers/emailSettings.controller.js';
const router = express.Router();

router.get('/site-config', getSiteConfig);

// Auth routes
router.post('/user', upload.single('image'), userController.createUser);
router.post('/login', userController.loginUser);
router.post('/verify', userController.verifyEmail);
router.post('/logout', userController.logoutUser);
router.get('/refresh-token', userController.refreshToken);
router.put('/update-user/:id', upload.single('image'), userController.updateUser);
router.post('/verify-password', authMiddleware, userController.verifyPassword);
router.post('/change-password/:id', userController.changePassword)
router.put('/users/:userId/update-role', userController.updateUserRoleAndDepartment);
router.get('/users/all', userController.fetchAllUsers); // Only accessible to admins
router.put('/users/:userId/update-role-department', userController.updateUserRoleAndDepartment);
router.post('/auth/admin', userController.adminLogin); // Admin login route
router.post('/auth/forgot-password', userController.forgotPassword);
router.post('/auth/reset-password/:token', userController.resetPassword);
router.post("/generate-otp/:userId", userController.generateOtpForUser);
router.delete("/users/:id", userController.deleteUser);

router.post("/admin/create-user", upload.single("image"), userController.createUserByAdmin);

// ✅ Protected route
router.get('/:id', authMiddleware, userController.getUser);

// Category routes
router.post('/categories', createCategory);                              // POST /api/category
router.get('/categories/all', getAllCategories);                        // GET /api/category
router.delete('/categories/:id', deleteCategory);                       // DELETE /api/category/:id
router.put('/categories/:id', updateCategoryLabel);                     // PUT /api/category/:id
router.post('/categories/:id/items', addItemToCategory);                // POST /api/category/:id/items
router.delete('/categories/:id/items', removeItemFromCategory);         // DELETE /api/category/:id/items
router.put('/categories/:id/items', updateItemInCategory);
router.put('/categories/:categoryId/departments', updateCategoryDepartments);
 
// Order routes
router.post('/order', createOrder);
router.get('/order/all', getAllOrders);
router.put('/order/:id', updateOrderStatus);
router.get("/staff-order/:department",  getOrdersForStaff);

// Site Configure
router.post('/site-config/update', upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
]), updateSiteConfig); // Can be PATCH also if you want

//  Dept route
router.post('/departments/create', createDepartment);
router.get('/departments/all', getAllDepartments);
router.put('/departments/:id', updateDepartment);
router.delete('/departments/:id', deleteDepartment);

// Email Setting

router.get("/get-email-settings", getEmailSettings);
router.put("/update-email-settings", updateEmailSettings);
export default router;
