// file: routes/rentRoutes.js
const express = require('express');
const router = express.Router();
const { rentItem } = require('../controllers/rentController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/:id', authenticate, authorize(['renter']), rentItem);

module.exports = router;
