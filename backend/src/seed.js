const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hospital_alert_db'
  });

  console.log('Finalizing FAIR database reset (Removing all dummy data)...');

  // Disable foreign key checks for reset
  await connection.execute('SET FOREIGN_KEY_CHECKS = 0');

  // 1. Reset Users Table (Keep ONLY the Admin)
  await connection.execute('DROP TABLE IF EXISTS Users');
  await connection.execute(`
    CREATE TABLE Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      staffId VARCHAR(50) NOT NULL,
      phone VARCHAR(20),
      dob DATE,
      gender VARCHAR(20),
      address TEXT,
      department VARCHAR(100),
      designation VARCHAR(100),
      shift VARCHAR(50),
      experience VARCHAR(50),
      license_no VARCHAR(100),
      status VARCHAR(20) DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);

  // ONLY the real admin account
  const users = [
    ['Sruthi Alex', 'admin@hospital.com', adminPassword, 'Admin', 'SYS-001', '9875700001', 'IT Dept', 'APPROVED']
  ];

  for (const user of users) {
    await connection.execute(
      'INSERT INTO Users (name, email, password_hash, role, staffId, phone, department, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      user
    );
  }

  // 2. Reset Alerts Table (Completely Empty)
  await connection.execute('DROP TABLE IF EXISTS Alerts');
  await connection.execute(`
    CREATE TABLE Alerts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code_type VARCHAR(50) NOT NULL,
      floor VARCHAR(20),
      ward VARCHAR(50),
      room VARCHAR(20),
      notes TEXT,
      status VARCHAR(20) DEFAULT 'Active',
      initiator_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      resolved_at TIMESTAMP NULL
    )
  `);

  await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
  console.log('✅ FAIR RESET COMPLETE. Database is clean. Only Admin "Sruthi Alex" exists.');
  await connection.end();
}

seed().catch(console.error);
