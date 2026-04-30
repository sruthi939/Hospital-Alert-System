const AlertCodeModel = require('../models/AlertCodeModel');

exports.getAlertCodes = async (req, res) => {
  try {
    const codes = await AlertCodeModel.getAll();
    res.json(codes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAlertCode = async (req, res) => {
  try {
    const id = await AlertCodeModel.create(req.body);
    res.status(201).json({ id, message: 'Alert Code created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAlertCode = async (req, res) => {
  try {
    await AlertCodeModel.update(req.params.id, req.body);
    res.json({ message: 'Alert Code updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAlertCode = async (req, res) => {
  try {
    await AlertCodeModel.delete(req.params.id);
    res.json({ message: 'Alert Code deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
