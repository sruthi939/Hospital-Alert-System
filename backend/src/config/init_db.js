const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  console.log('🚀 Starting Database Setup...');

  try {
    // Create Database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'hospital_alert_db'}`);
    console.log(`✅ Database "${process.env.DB_NAME}" created or already exists.`);

    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('NURSE', 'DOCTOR', 'ADMIN') DEFAULT 'NURSE',
        staffId VARCHAR(50) UNIQUE,
        phone VARCHAR(20),
        dob DATE,
        gender VARCHAR(20),
        address TEXT,
        department VARCHAR(100),
        designation VARCHAR(100),
        shift VARCHAR(50),
        experience VARCHAR(50),
        license_no VARCHAR(100),
        status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready.');

    // Create Alerts Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Alerts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code_type VARCHAR(50) NOT NULL,
        floor VARCHAR(50) NOT NULL,
        ward VARCHAR(50) NOT NULL,
        room VARCHAR(50) NOT NULL,
        notes TEXT,
        status ENUM('ACTIVE', 'ACCEPTED', 'IN_PROGRESS', 'RESOLVED') DEFAULT 'ACTIVE',
        initiator_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP NULL,
        FOREIGN KEY (initiator_id) REFERENCES Users(id)
      )
    `);
    console.log('✅ Alerts table ready.');

    // Create a Test Nurse
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('password123', 10);
    await connection.query(`
      INSERT IGNORE INTO Users (name, email, password_hash, role, staffId, status)
      VALUES ('Nurse Anjali', 'nurse@hospital.com', '${hash}', 'NURSE', 'NUR12345', 'APPROVED')
    `);
    console.log('✅ Test user "nurse@hospital.com" created (Password: password123)');

    console.log('\n✨ DATABASE SETUP COMPLETE! Your backend is now ready.');
  } catch (err) {
    console.error('❌ Setup Failed:', err.message);
  } finally {
    await connection.end();
  }
}

setup();
