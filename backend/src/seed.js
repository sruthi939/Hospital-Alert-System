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

  const adminUsers = [
    ['Sruthi Alex', 'admin@hospital.com', adminPassword, 'Admin', 'SYS-001', '9875700001', 'IT Dept', 'APPROVED']
  ];

  for (const user of adminUsers) {
    await connection.execute(
      'INSERT INTO Users (name, email, password_hash, role, staffId, phone, department, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      user
    );
  }

  // 2. Reset Alerts Table
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
      triggered_by VARCHAR(255),
      action_taken VARCHAR(255),
      department VARCHAR(100),
      initiator_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      resolved_at TIMESTAMP NULL
    )
  `);

  const historicalAlerts = []; // CLEAN SLATE: Only real alerts will be logged here

  for (const alert of historicalAlerts) {
    await connection.execute(
      'INSERT INTO Alerts (code_type, floor, ward, room, notes, status, triggered_by, action_taken, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      alert
    );
  }

  // 3. Reset Departments Table
  await connection.execute('DROP TABLE IF EXISTS Departments');
  await connection.execute(`
    CREATE TABLE Departments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      head VARCHAR(255),
      staff_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Reset Wards Table
  await connection.execute('DROP TABLE IF EXISTS Wards');
  await connection.execute(`
    CREATE TABLE Wards (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      department VARCHAR(255),
      room_count INT DEFAULT 0,
      bed_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 5. Reset AlertCodes Table
  await connection.execute('DROP TABLE IF EXISTS AlertCodes');
  await connection.execute(`
    CREATE TABLE AlertCodes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(50) NOT NULL UNIQUE,
      color VARCHAR(50) NOT NULL,
      description TEXT,
      status VARCHAR(20) DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const codes = [
    ['Code Blue', 'CODE BLUE', '#3b82f6', 'Cardiac Arrest', 'Active'],
    ['Code Red', 'CODE RED', '#ef4444', 'Fire', 'Active'],
    ['Code Yellow', 'CODE YELLOW', '#f59e0b', 'Disaster', 'Active'],
    ['Code Pink', 'CODE PINK', '#ec4899', 'Infant Abduction', 'Active'],
    ['Code Grey', 'CODE GREY', '#94a3b8', 'Security Threat', 'Active'],
    ['Code Orange', 'CODE ORANGE', '#f97316', 'Hazardous Material', 'Active']
  ];

  for (const code of codes) {
    await connection.execute(
      'INSERT INTO AlertCodes (name, code, color, description, status) VALUES (?, ?, ?, ?, ?)',
      code
    );
  }

  // 6. Reset Settings Table
  await connection.execute('DROP TABLE IF EXISTS Settings');
  await connection.execute(`
    CREATE TABLE Settings (
      id INT PRIMARY KEY,
      hospital_name VARCHAR(255),
      address TEXT,
      timezone VARCHAR(100),
      date_format VARCHAR(50),
      time_format VARCHAR(50),
      language VARCHAR(50),
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    INSERT INTO Settings (id, hospital_name, address, timezone, date_format, time_format, language)
    VALUES (1, 'City Care Hospital', '123, Health City, Medical District, Mumbai', '(GMT+05:30) Asia/Kolkata', 'DD/MM/YYYY', '12 Hour (AM/PM)', 'English')
  `);

  await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
  console.log('✅ FAIR RESET COMPLETE. Database is clean. Only Admin "Sruthi Alex" exists.');
  await connection.end();
}

seed().catch(console.error);
