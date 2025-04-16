import Role from '../models/employee.model.js'; // Adjust the import based on your file structure
import { ApiError, ApiResponse } from './api.utils.js';

// Get all roles with pagination and optional search
export const GetAllEmployee = asyncHandler(async (req, res, next) => {
    try {
        // Destructure query parameters with default values
        const { currentPage = 1, limit = 10, search } = req.query;

        // Build the query object
        const query = {
            isDeleted: false, // Ensure you're checking for non-deleted roles
        };

        // Add search filtering if a search term is provided
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive regex search
        }

        // Fetch roles with pagination
        const employee = await Role.find(query)
            .limit(limit * 1) // Limit the number of results
            .skip((currentPage - 1) * limit); // Skip the previous pages

        const total = await Role.countDocuments(query); // Count total documents matching the query

        // Calculate the total number of pages
        const pages = Math.ceil(total / limit);

        // Send response with roles, total count, and total pages
        res.status(200).json(new ApiResponse(200, { employee, total, pages }, 'Roles retrieved successfully'));
    } catch (error) {
        next(new ApiError(500, 'Internal server error', [error.message])); // Pass error to next middleware
    }
});
