const SettingsModel = require('../models/SettingsModel');

exports.getSettings = async (req, res) => {
  try {
    const settings = await SettingsModel.get();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    await SettingsModel.update(req.body);
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
