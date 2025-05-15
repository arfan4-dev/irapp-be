// models/Order.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    catId: {
        type: String,
        required: true, // ✅ Ensure every order links to a category
    }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    person: { type: String, required: true },
    type: { type: String },
    department: { type: String },
    location: { type: String },
    items: [itemSchema],
    status: { type: String, enum: ['Pending', 'In Progress', 'Answered'], default: 'Pending' },
    timestamp: { type: Date, default: Date.now },


});

export default mongoose.model('Order', orderSchema);
