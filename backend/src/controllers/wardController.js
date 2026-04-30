const WardModel = require('../models/WardModel');

exports.getWards = async (req, res) => {
  try {
    const wards = await WardModel.getAll();
    res.json(wards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWard = async (req, res) => {
  try {
    const id = await WardModel.create(req.body);
    res.status(201).json({ id, message: 'Ward created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWard = async (req, res) => {
  try {
    await WardModel.update(req.params.id, req.body);
    res.json({ message: 'Ward updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteWard = async (req, res) => {
  try {
    await WardModel.delete(req.params.id);
    res.json({ message: 'Ward deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
