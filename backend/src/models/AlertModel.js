const db = require('../config/db');

const AlertModel = {
  create: async (alertData) => {
    const { code_type, floor, ward, room, notes, initiator_id } = alertData;
    const [result] = await db.execute(
      'INSERT INTO Alerts (code_type, floor, ward, room, notes, initiator_id) VALUES (?, ?, ?, ?, ?, ?)',
      [code_type, floor, ward, room, notes, initiator_id || null]
    );
    return result.insertId;
  },

  getRecent: async () => {
    const [rows] = await db.execute(
      'SELECT * FROM Alerts ORDER BY created_at DESC LIMIT 10'
    );
    return rows;
  },

  updateStatus: async (alertId, status) => {
    await db.execute('UPDATE Alerts SET status = ? WHERE id = ?', [status, alertId]);
  }
};

module.exports = AlertModel;
