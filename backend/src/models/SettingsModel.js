const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  hospital_name: String,
  address: String,
  timezone: String,
  date_format: String,
  time_format: String,
  language: String
});

const Settings = mongoose.model('Settings', settingsSchema);

const SettingsModel = {
  get: async () => {
    let settings = await Settings.findOne();
    if (!settings) {
       settings = await Settings.create({});
    }
    return settings;
  },
  update: async (data) => {
    let settings = await Settings.findOne();
    if (settings) {
      await Settings.findByIdAndUpdate(settings._id, data);
    } else {
      await Settings.create(data);
    }
  }
};

module.exports = SettingsModel;
