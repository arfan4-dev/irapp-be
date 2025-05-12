import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },

    allowMultiple: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true }, // ✅ Add this
});

const categorySchema = new mongoose.Schema({
    label: { type: String, required: true, },
 
    enabled: { type: Boolean, default: true },

    items: [itemSchema],

}, { timestamps: true }); // Optional: adds createdAt/updatedAt

export default mongoose.model('Category', categorySchema);
