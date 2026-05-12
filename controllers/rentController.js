// file: controllers/rentController.js
const rentService = require('../services/rentService');

const rentItem = async (req, res, next) => {
    const itemId = req.params.id;
    const renterId = req.user.id;

    try {
        const result = await rentService.processRental(itemId, renterId);
        res.json({
            success: true,
            message: 'Item rented successfully',
            data: result
        });
    } catch (error) {
        if (error.message === 'Item not found' || error.message === 'Item is already rented') {
            return res.status(400).json({ success: false, message: error.message });
        }
        next(error);
    }
};

module.exports = { rentItem };
