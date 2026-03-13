const express = require('express');
const router = express.Router();
const { paystackWebhook } = require('../controllers/webhookController');

// Requires raw body or correctly parsed JSON body. (handled in server.js)
router.post('/paystack', paystackWebhook);

module.exports = router;
