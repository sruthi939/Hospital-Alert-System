const db = require('../config/db');

const AlertCodeModel = {
  getAll: async () => {
    const [rows] = await db.execute('SELECT * FROM AlertCodes');
    return rows;
  },

  create: async (data) => {
    const { name, code, color, description, status } = data;
    const [result] = await db.execute(
      'INSERT INTO AlertCodes (name, code, color, description, status) VALUES (?, ?, ?, ?, ?)',
      [name, code, color, description, status || 'Active']
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { name, code, color, description, status } = data;
    await db.execute(
      'UPDATE AlertCodes SET name = ?, code = ?, color = ?, description = ?, status = ? WHERE id = ?',
      [name, code, color, description, status, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM AlertCodes WHERE id = ?', [id]);
  }
};

module.exports = AlertCodeModel;
