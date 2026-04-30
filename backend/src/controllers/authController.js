const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    // SECURITY CHECK: Ensure account is approved
    if (user.status !== 'APPROVED') {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account is pending admin approval. Please contact your supervisor.' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
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
    // Save request with PENDING status
    const userId = await UserModel.create({
      ...req.body,
      status: 'PENDING'
    });
    res.status(201).json({ success: true, userId, message: 'Registration request submitted for approval' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
