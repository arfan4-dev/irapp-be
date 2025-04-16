import jwt from 'jsonwebtoken';
import Token from '../models/token.model.js';
import { JWT_ACCESS_TOKEN_SECRET_KEY } from '../config/env.config.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken; // Get token from cookies
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const tokenDoc = await Token.findOne({ token });
        if (!tokenDoc) {
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Authentication failed', error: error.message });
    }
};