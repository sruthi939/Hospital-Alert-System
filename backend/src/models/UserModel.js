const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['NURSE', 'DOCTOR', 'ADMIN'], default: 'NURSE' },
  staffId: { type: String, unique: true },
  phone: String,
  dob: Date,
  gender: String,
  address: String,
  department: String,
  designation: String,
  shift: String,
  experience: String,
  license_no: String,
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

// ensure virtuals map to 'id' for compatibility with old controllers
userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

const UserModel = {
  findByEmail: async (email) => {
    const sanitizedEmail = (email || '').trim().toLowerCase();
    return await User.findOne({ email: sanitizedEmail });
  },
  create: async (userData) => {
    const { password, email, ...rest } = userData;
    const sanitizedEmail = (email || '').trim().toLowerCase();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({
      ...rest,
      email: sanitizedEmail,
      password_hash: hashedPassword
    });
    const savedUser = await newUser.save();
    return savedUser._id;
  },
  getAll: async () => {
    return await User.find({}, 'id name email role staffId department status phone');
  },
  update: async (id, userData) => {
    await User.findByIdAndUpdate(id, userData);
  },
  delete: async (id) => {
    await User.findByIdAndDelete(id);
  }
};

module.exports = UserModel;
