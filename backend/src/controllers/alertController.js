const AlertModel = require('../models/AlertModel');

exports.triggerAlert = async (req, res) => {
  try {
    const alertId = await AlertModel.create(req.body);
    
    const io = req.app.get('socketio');
    if (io) {
      io.emit('new_alert', { id: alertId, ...req.body, created_at: new Date() });
    }

    res.status(201).json({ success: true, alertId });
  } catch (error) {
    console.error('Trigger Alert Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRecentAlerts = async (req, res) => {
  try {
    const alerts = await AlertModel.getRecent();
    res.json(alerts);
  } catch (error) {
    console.error('Get Recent Alerts Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
