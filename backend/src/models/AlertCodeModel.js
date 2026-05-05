const mongoose = require('mongoose');

const alertCodeSchema = new mongoose.Schema({
  name: String,
  code: String,
  color: String,
  description: String,
  status: { type: String, default: 'Active' }
});

alertCodeSchema.virtual('id').get(function(){ return this._id.toHexString(); });
alertCodeSchema.set('toJSON', { virtuals: true });

const AlertCode = mongoose.model('AlertCode', alertCodeSchema);

const AlertCodeModel = {
  getAll: async () => {
    return await AlertCode.find();
  },
  create: async (data) => {
    const newCode = new AlertCode(data);
    const savedCode = await newCode.save();
    return savedCode._id;
  },
  update: async (id, data) => {
    await AlertCode.findByIdAndUpdate(id, data);
  },
  delete: async (id) => {
    await AlertCode.findByIdAndDelete(id);
  }
};

module.exports = AlertCodeModel;
