const db = require('../config/db');

const WardModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM Wards');
    return rows;
  },

  create: async (data) => {
    const { name, department, rooms, beds } = data;
    const [result] = await db.execute(
      'INSERT INTO Wards (name, department, room_count, bed_count) VALUES (?, ?, ?, ?)',
      [name, department, rooms || 0, beds || 0]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { name, department, rooms, beds } = data;
    await db.execute(
      'UPDATE Wards SET name = ?, department = ?, room_count = ?, bed_count = ? WHERE id = ?',
      [name, department, rooms, beds, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM Wards WHERE id = ?', [id]);
  }
};

module.exports = WardModel;
