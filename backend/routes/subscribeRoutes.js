const express = require('express');
const router = express.Router();
const { subscribe, unsubscribe } = require('../controllers/subscribeController');

// POST /api/subscribe
router.post('/', subscribe);

// GET /api/subscribe/unsubscribe?email=...
router.get('/unsubscribe', unsubscribe);

module.exports = router;
