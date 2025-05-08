// controllers/orderController.js

import Order from '../models/order.model.js';
import { validateOrder } from '../validation/order.validation.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/api.utils.js';

export const createOrder = asyncHandler(async (req, res) => {
    const { error } = validateOrder(req.body);
    console.log(req.body)
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
    console.log("Before update:", order)

    order.status = status || order.status;
    order.timestamp = new Date().toISOString()
    const updated = await order.save();

    console.log("After update:", updated)
    return res.status(200).json(new ApiResponse(200, updated, 'Order status updated'));
});
