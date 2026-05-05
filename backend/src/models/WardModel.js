const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  name: String,
  department: String,
  room_count: { type: Number, default: 0 },
  bed_count: { type: Number, default: 0 }
});

wardSchema.virtual('id').get(function(){ return this._id.toHexString(); });
wardSchema.set('toJSON', { virtuals: true });

const Ward = mongoose.model('Ward', wardSchema);

const WardModel = {
  getAll: async () => {
    const wards = await Ward.find();
    return wards.map(w => ({
      ...w.toJSON(),
      rooms: w.room_count,
      beds: w.bed_count
    }));
  },
  create: async (data) => {
    const newWard = new Ward({
      name: data.name,
      department: data.department,
      room_count: data.rooms || 0,
      bed_count: data.beds || 0
    });
    const savedWard = await newWard.save();
    return savedWard._id;
  },
  update: async (id, data) => {
    await Ward.findByIdAndUpdate(id, {
      name: data.name,
      department: data.department,
      room_count: data.rooms,
      bed_count: data.beds
    });
  },
  delete: async (id) => {
    await Ward.findByIdAndDelete(id);
  }
};

module.exports = WardModel;
