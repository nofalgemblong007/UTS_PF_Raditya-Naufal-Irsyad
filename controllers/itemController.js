// file: controllers/itemController.js
const pool = require('../config/db');

const getItems = async (req, res, next) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM items WHERE status = "available"');
        res.json({ success: true, data: rows });
    } catch (error) {
        next(error);
    }
};

const createItem = async (req, res, next) => {
    const { name, category, price_per_day } = req.body;
    const owner_id = req.user.id;

    try {
        const [result] = await pool.execute(
            'INSERT INTO items (name, category, price_per_day, owner_id) VALUES (?, ?, ?, ?)',
            [name, category, price_per_day, owner_id]
        );
        res.status(201).json({
            success: true,
            message: 'Item listed successfully',
            itemId: result.insertId
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getItems, createItem };
