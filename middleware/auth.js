// file: middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware: Verify JWT Token and attach user payload to req.user
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized: No token provided' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded; // Contains user payload (id, email, role)
        next();
    } catch (err) {
        return res.status(401).json({ 
            success: false, 
            message: 'Unauthorized: Invalid or expired token' 
        });
    }
};

/**
 * Middleware Factory: Role-based access control
 * @param {Array} roles - Allowed roles (e.g., ['owner', 'renter'])
 */
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Forbidden: Access restricted to ${roles.join(' or ')}` 
            });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
