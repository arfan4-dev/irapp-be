import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET_KEY } from '../config/env.config.js';
import { User } from '../models/user.model.js';

export const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(401).json({ message: "Unauthorized. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden. Admins only." });
        }

        req.user = user; // Optional: attach user to request object
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
