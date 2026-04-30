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

exports.updateUser = async (req, res) => {
  try {
    await UserModel.update(req.params.id, req.body);
    res.json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    console.error('Update User Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserModel.delete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
