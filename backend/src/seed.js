const mysql = require('mysql2/promise');
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

  console.log('Seeding fair data into database...');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      department VARCHAR(100),
      employeeId VARCHAR(50),
      phone VARCHAR(20),
      status VARCHAR(20) DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const users = [
    ['Anjali Sharma', 'anjali.sharma@hospital.com', 'password123', 'Nurse', 'ICU', 'NUR-101', '9876543210'],
    ['Priya Patel', 'priya.patel@hospital.com', 'password123', 'Nurse', 'General Ward', 'NUR-102', '9876543211'],
    ['Dr. Rahul Mehta', 'rahul.mehta@hospital.com', 'password123', 'Doctor', 'Cardiology', 'DOC-501', '9876500001'],
    ['Dr. Sneha Iyer', 'sneha.iyer@hospital.com', 'password123', 'Doctor', 'ICU', 'DOC-502', '9876500002'],
    ['Rohit Singh', 'rohit.singh@hospital.com', 'password123', 'EMT', 'Emergency', 'EMT-901', '9875500001'],
    ['Amit Kumar', 'amit.kumar@hospital.com', 'password123', 'Admin', 'IT Dept', 'SYS-001', '9875700001']
  ];

  for (const user of users) {
    try {
      await connection.execute(
        'INSERT INTO Users (name, email, password, role, department, employeeId, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
        user
      );
    } catch (e) {
      console.log(`User ${user[1]} already exists, skipping.`);
    }
  }

  console.log('✅ Database seeded with fair personnel data.');
  await connection.end();
}

seed().catch(console.error);
