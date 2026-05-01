const db = require('../config/db');
const bcrypt = require('bcryptjs');

const UserModel = {
  findByEmail: async (email) => {
    const sanitizedEmail = (email || '').trim().toLowerCase();
    const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [sanitizedEmail]);
    return rows[0];
  },

  create: async (userData) => {
    const { 
      name, email, password, role, staffId, 
      phone, dob, gender, address, department, designation, shift, experience, license_no,
      status 
    } = userData;
    
    const sanitizedEmail = (email || '').trim().toLowerCase();
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const [result] = await db.execute(
      `INSERT INTO Users 
      (name, email, password_hash, role, staffId, phone, dob, gender, address, department, designation, shift, experience, license_no, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, sanitizedEmail, hashedPassword, role || 'NURSE', staffId, 
        phone || null, dob || null, gender || null, address || null, 
        department || null, designation || null, shift || null, 
        experience || null, license_no || null, status || 'PENDING'
      ]
    );
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await db.execute('SELECT id, name, email, role, staffId, department, status, phone FROM Users');
    return rows;
  },

  update: async (id, userData) => {
    const { name, email, role, staffId, department, status, phone } = userData;
    await db.execute(
      'UPDATE Users SET name = ?, email = ?, role = ?, staffId = ?, department = ?, status = ?, phone = ? WHERE id = ?',
      [name, email, role, staffId, department, status, phone || null, id]
    );
  },

  delete: async (id) => {
    await db.execute('DELETE FROM Users WHERE id = ?', [id]);
  }
};

module.exports = UserModel;
