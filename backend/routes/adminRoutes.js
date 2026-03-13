const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/adminController');

router.post('/login', loginAdmin);
// Only for initial setup, should be removed or disabled in production if already set up
router.post('/register', registerAdmin);

module.exports = router;
