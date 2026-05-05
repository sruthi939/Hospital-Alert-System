const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  code_type: { type: String, required: true },
  floor: { type: String, required: true },
  ward: { type: String, required: true },
  room: { type: String, required: true },
  notes: String,
  status: { type: String, enum: ['ACTIVE', 'ACCEPTED', 'IN_PROGRESS', 'RESOLVED'], default: 'ACTIVE' },
  initiator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolved_at: Date
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

alertSchema.virtual('id').get(function(){ return this._id.toHexString(); });
alertSchema.set('toJSON', { virtuals: true });

const Alert = mongoose.model('Alert', alertSchema);

const AlertModel = {
  create: async (alertData) => {
    // Some controllers might pass initiator_id as a string, check if it's empty
    if(alertData.initiator_id === '') delete alertData.initiator_id;
    const newAlert = new Alert(alertData);
    const savedAlert = await newAlert.save();
    return savedAlert._id;
  },
  getRecent: async () => {
    return await Alert.find().sort({ created_at: -1 }).limit(10);
  },
  updateStatus: async (alertId, status) => {
    await Alert.findByIdAndUpdate(alertId, { status });
  }
};

module.exports = AlertModel;
