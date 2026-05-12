// file: controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        // Use bcryptjs to hash password so users can set any password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'renter']
        );

        // Clear JSON response for Postman
        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            data: {
                userId: result.insertId,
                name,
                email,
                role: role || 'renter'
            }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        // Verify password with bcrypt.compare
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Clear JSON response with token for easy copying
        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: { 
                id: user.id, 
                name: user.name, 
                role: user.role 
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
