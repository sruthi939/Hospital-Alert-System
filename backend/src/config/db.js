const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hospital_alert_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅ Connected to MySQL Database');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Database Connection Failed:', err.message);
    console.log('Please ensure MySQL is running and the database "hospital_alert_db" exists.');
  });

module.exports = pool;
