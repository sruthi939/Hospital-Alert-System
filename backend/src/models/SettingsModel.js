const db = require('../config/db');

const SettingsModel = {
  get: async () => {
    const [rows] = await db.execute('SELECT * FROM Settings WHERE id = 1');
    return rows[0];
  },

  update: async (data) => {
    const { hospital_name, address, timezone, date_format, time_format, language } = data;
    await db.execute(
      `UPDATE Settings SET 
        hospital_name = ?, 
        address = ?, 
        timezone = ?, 
        date_format = ?, 
        time_format = ?, 
        language = ? 
      WHERE id = 1`,
      [hospital_name, address, timezone, date_format, time_format, language]
    );
  }
};

module.exports = SettingsModel;
