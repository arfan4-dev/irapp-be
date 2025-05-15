// controllers/orderController.js

import Order from '../models/order.model.js';
import { validateOrder } from '../validation/order.validation.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/api.utils.js';
import Department from "../models/department.model.js";
import Category from '../models/category.model.js';

export const createOrder = asyncHandler(async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    return res.status(201).json(new ApiResponse(201, savedOrder, 'Order created successfully'));
});


// Get orders for logged-in user
export const getAllOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find();
    return res
        .status(200)
        .json(new ApiResponse(200, orders, 'User orders fetched successfully'));
});


export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
        throw new ApiError(404, 'Order not found');
    }

    order.status = status || order.status;
    order.timestamp = new Date().toISOString()
    const updated = await order.save();

    return res.status(200).json(new ApiResponse(200, updated, 'Order status updated'));
});

// Get orders for staff based on department
export const getOrdersForStaff = asyncHandler(async (req, res) => {
    const { department } = req.params;

    if (!department) {
        return res.status(400).json({ success: false, message: "Department ID is required" });
    }
    // Step 1: Confirm department exists
    const dept = await Department.findOne({ name: department });
    if (!dept) {
        return res.status(404).json({ success: false, message: "Department not found" });
    }
    // Step 2: Get categories where this department ID is in departments array
    const categories = await Category.find({ departments: dept._id });

    const validCatIds = categories.map(cat => cat._id.toString());
    // Step 3: Get orders where at least one item has catId in the list
    const orders = await Order.find({
        "items.catId": { $in: validCatIds }
    });
    if (!orders || orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found for this department" });
    }

    return res.status(200).json(new ApiResponse(200, orders, "Orders filtered by department mapping"));
});