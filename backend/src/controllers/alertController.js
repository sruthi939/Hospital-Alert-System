const db = require('../config/db');

exports.createAlert = async (req, res) => {
  try {
    const { code_type, floor, ward, room, initiator_id } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO Alerts (code_type, floor, ward, room, initiator_id) VALUES (?, ?, ?, ?, ?)',
      [code_type, floor, ward, room, initiator_id]
    );

    res.status(201).json({ message: 'Alert created successfully', alertId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

exports.getActiveAlerts = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM Alerts WHERE status != "RESOLVED" ORDER BY created_at DESC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

exports.updateAlertStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.execute('UPDATE Alerts SET status = ? WHERE id = ?', [status, id]);
    
    res.status(200).json({ message: 'Alert status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update alert' });
  }
};
