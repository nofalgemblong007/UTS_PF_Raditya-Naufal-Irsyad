// file: routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/itemController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getItems);
router.post('/', authenticate, authorize(['owner']), createItem);

module.exports = router;
