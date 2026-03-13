const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    // Check for admin user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      admin: {
        id: admin._id,
        username: admin.username
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          token,
          admin: {
            id: admin._id,
            username: admin.username
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Register initial admin (Run once or secure this route heavily)
// @route   POST /api/admin/register
// @access  Public (temporarily for setup)
const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if any admin already exists to prevent open registration
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
       return res.status(403).json({ success: false, message: 'Admin already exists. Cannot register again.' });
    }

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ success: true, message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin
};
