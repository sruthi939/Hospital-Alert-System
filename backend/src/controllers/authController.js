const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findByEmail(email);
    console.log("Login attempt for email:", email);
    
    if (!user) {
      console.log("Login failed: User not found in database.");
      return res.status(400).json({ success: false, message: 'DEBUG: User not found' });
    }

    console.log("User found. Status:", user.status);

    // SECURITY CHECK: Ensure account is approved
    const status = (user.status || '').toUpperCase();
    if (status !== 'APPROVED' && status !== 'ACTIVE') {
      console.log("Login blocked: Account pending approval.");
      return res.status(403).json({ 
        success: false, 
        message: 'Your account is pending admin approval. Please contact your supervisor.' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Login failed: Password mismatch.");
      return res.status(400).json({ success: false, message: 'DEBUG: Password mismatch' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret_key_123',
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, name: user.name, role: user.role, staffId: user.staffId }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    // Pass the body directly; UserModel.create handles password hashing internally
    const userId = await UserModel.create({
      ...req.body,
      status: 'PENDING'
    });
    res.status(201).json({ success: true, userId, message: 'Registration request submitted for approval' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.checkStatus = async (req, res) => {
  const email = (req.params.email || '').trim().toLowerCase();
  try {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, status: user.status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
