// models/Order.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    person: { type: String, required: true }, // for display
    type: { type: String }, // optional: for categorizing requests
    items: [itemSchema],
    status: { type: String, enum: ['Pending', 'In Progress', 'Answered'], default: 'Pending' },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
