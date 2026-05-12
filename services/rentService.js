// file: services/rentService.js
const pool = require('../config/db');

const processRental = async (itemId, renterId) => {
    // Get a dedicated connection from the pool for the transaction
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        // Lock the row with FOR UPDATE to prevent race conditions (Double Booking)
        const [items] = await connection.execute(
            'SELECT * FROM items WHERE id = ? FOR UPDATE',
            [itemId]
        );

        const item = items[0];

        if (!item) {
            throw new Error('Item not found');
        }

        if (item.status !== 'available') {
            throw new Error('Item is already rented');
        }

        // Update item status to 'rented'
        await connection.execute(
            'UPDATE items SET status = ? WHERE id = ?',
            ['rented', itemId]
        );

        // Record the transaction
        const [result] = await connection.execute(
            'INSERT INTO transactions (item_id, renter_id, total_price, status) VALUES (?, ?, ?, ?)',
            [itemId, renterId, item.price_per_day, 'completed']
        );

        // Commit all changes
        await connection.commit();
        
        return {
            transactionId: result.insertId,
            itemName: item.name,
            totalPrice: item.price_per_day
        };
    } catch (error) {
        // Rollback on any failure to maintain data integrity
        await connection.rollback();
        throw error;
    } finally {
        // Always release the connection back to the pool
        connection.release();
    }
};

module.exports = { processRental };
