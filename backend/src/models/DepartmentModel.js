const db = require('../config/db');

const DepartmentModel = {
  getAll: async () => {
    // We'll join with Users to get the real staff count per department if needed, 
    // but for now let's use a dedicated table as requested in the design.
    const [rows] = await db.execute('SELECT * FROM Departments');
    return rows;
  },

  create: async (data) => {
    const { name, head, staffCount } = data;
    const [result] = await db.execute(
      'INSERT INTO Departments (name, head, staff_count) VALUES (?, ?, ?)',
      [name, head, staffCount || 0]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { name, head, staffCount } = data;
    await db.execute(
      'UPDATE Departments SET name = ?, head = ?, staff_count = ? WHERE id = ?',
      [name, head, staffCount, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM Departments WHERE id = ?', [id]);
  }
};

module.exports = DepartmentModel;
