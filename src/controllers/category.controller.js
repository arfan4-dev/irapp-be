// controllers/categoryController.js

import Category from '../models/category.model.js';
import { validateCategory } from '../validation/category.validation.js';

// ➕ Create category
export const createCategory = async (req, res) => {
    try {
        const { error } = validateCategory(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const category = new Category({
            label: req.body.label,
            department:req.body.department
        });

        await category.save();

        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({
            success: false,
            message: "Server error while creating category",
        });
    }
};


// 📃 Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.json({ success: true, data: categories });
    } catch (err) {
        console.log("Error fetching categories:", err.errmsg);

        res.status(500).json({ success: false, message: err.errmsg });
    }
};

// 🗑️ Delete category
export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✏️ Update category label
export const updateCategoryLabel = async (req, res) => {
    try {
        const { newLabel, newDepartment, enabled } = req.body;
        console.log(newLabel, newDepartment, enabled)
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            { label: newLabel,
                department: newDepartment,
                enabled
             },
            { new: true }
        );
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ➕ Add item to category
export const addItemToCategory = async (req, res) => {
    try {
        const { itemName, allowMultiple } = req.body;
        console.log(itemName, allowMultiple)
        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $push: { items: { name: itemName, allowMultiple } }
            },
            { new: true }
        );
        console.log("updated:", updated)
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🗑️ Remove item from category
export const removeItemFromCategory = async (req, res) => {
    try {
        const { itemName } = req.body;
        console.log(itemName);

        const updated = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { items: { name: itemName } }
            },
            { new: true }
        );
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const updateItemInCategory =async (req, res) => {
    const { id } = req.params;
    const { oldItemName, newItem } = req.body;

    const updated = await Category.findOneAndUpdate(
        { _id: id, "items.name": oldItemName },
        {
            $set: {
                "items.$.name": newItem.name,
                "items.$.allowMultiple": newItem.allowMultiple,
            }
        },
        { new: true }
    );

    res.json({ success: true, data: updated });
};
