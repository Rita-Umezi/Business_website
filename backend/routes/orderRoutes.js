const express = require('express');
const router = express.Router();
const { checkout, getOrders, updateOrderStatus } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

// Public checkout route
router.post('/checkout', checkout);

// Admin routes
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
