const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital_alert_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Drop database to ensure a clean slate
    await mongoose.connection.db.dropDatabase();
    console.log('Finalizing FAIR database reset (Removing all dummy data)...');

    // Register all schemas
    require('./models/UserModel');
    require('./models/AlertModel');
    require('./models/DepartmentModel');
    require('./models/WardModel');
    require('./models/AlertCodeModel');
    require('./models/SettingsModel');

    const User = mongoose.model('User');
    const AlertCode = mongoose.model('AlertCode');
    const Settings = mongoose.model('Settings');

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'Sruthi Alex',
      email: 'admin@hospital.com',
      password_hash: adminPassword,
      role: 'ADMIN',
      staffId: 'SYS-001',
      phone: '9875700001',
      department: 'IT Dept',
      status: 'APPROVED'
    });

    const codes = [
      { name: 'Code Blue', code: 'CODE BLUE', color: '#3b82f6', description: 'Cardiac Arrest', status: 'Active' },
      { name: 'Code Red', code: 'CODE RED', color: '#ef4444', description: 'Fire', status: 'Active' },
      { name: 'Code Yellow', code: 'CODE YELLOW', color: '#f59e0b', description: 'Disaster', status: 'Active' },
      { name: 'Code Pink', code: 'CODE PINK', color: '#ec4899', description: 'Infant Abduction', status: 'Active' },
      { name: 'Code Grey', code: 'CODE GREY', color: '#94a3b8', description: 'Security Threat', status: 'Active' },
      { name: 'Code Orange', code: 'CODE ORANGE', color: '#f97316', description: 'Hazardous Material', status: 'Active' }
    ];

    await AlertCode.insertMany(codes);

    await Settings.create({
      hospital_name: 'City Care Hospital',
      address: '123, Health City, Medical District, Mumbai',
      timezone: '(GMT+05:30) Asia/Kolkata',
      date_format: 'DD/MM/YYYY',
      time_format: '12 Hour (AM/PM)',
      language: 'English'
    });

    console.log('✅ FAIR RESET COMPLETE. Database is clean. Only Admin "Sruthi Alex" exists.');
    
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
