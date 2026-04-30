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

exports.updateAlertStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await AlertModel.updateStatus(id, status);
    res.json({ success: true, message: 'Alert status updated' });
  } catch (error) {
    console.error('Update Alert Status Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
