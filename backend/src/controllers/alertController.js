const AlertModel = require('../models/AlertModel');

exports.triggerAlert = async (req, res) => {
  try {
    const alertId = await AlertModel.create(req.body);
    
    // Broadcast via Socket.io (handled in app.js or socket service)
    const io = req.app.get('socketio');
    if (io) {
      io.emit('new_alert', { id: alertId, ...req.body, created_at: new Date() });
    }

    res.status(201).json({ success: true, alertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getRecentAlerts = async (req, res) => {
  try {
    const alerts = await AlertModel.getRecent();
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
