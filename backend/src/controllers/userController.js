const UserModel = require('../models/UserModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAll();
    res.json(users);
  } catch (error) {
    console.error('Get Users Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userId = await UserModel.create(req.body);
    res.status(201).json({ success: true, userId });
  } catch (error) {
    console.error('Create User Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
