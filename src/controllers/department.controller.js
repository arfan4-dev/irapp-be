import Department from "../models/department.model.js";

// Create
export const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        const department = await Department.create({ name });
        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read
export const getAllDepartments = async (req, res) => {
    try {
        const search = req.query.search || '';
        const departments = await Department.find({
            name: { $regex: search, $options: 'i' }
        }).sort({ createdAt: -1 });
        res.status(200).json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
export const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.status(200).json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete
export const deleteDepartment = async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
