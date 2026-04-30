const db = require('../config/db');
const bcrypt = require('bcryptjs');

const UserModel = {
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (userData) => {
    const { 
      name, email, password, role, staffId, 
      phone, dob, gender, address, department, designation, shift, experience, license_no,
      status 
    } = userData;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const [result] = await db.execute(
      `INSERT INTO Users 
      (name, email, password_hash, role, staffId, phone, dob, gender, address, department, designation, shift, experience, license_no, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, email, hashedPassword, role || 'NURSE', staffId, 
        phone || null, dob || null, gender || null, address || null, 
        department || null, designation || null, shift || null, 
        experience || null, license_no || null, status || 'PENDING'
      ]
    );
    return result.insertId;
  },

  getAll: async () => {
    const [rows] = await db.execute('SELECT id, name, email, role, staffId, department, status FROM Users');
    return rows;
  }
};

module.exports = UserModel;
