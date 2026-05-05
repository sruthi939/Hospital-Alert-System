const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: String,
  head: String,
  staff_count: { type: Number, default: 0 }
});

departmentSchema.virtual('id').get(function(){ return this._id.toHexString(); });
departmentSchema.set('toJSON', { virtuals: true });

const Department = mongoose.model('Department', departmentSchema);

const DepartmentModel = {
  getAll: async () => {
    const depts = await Department.find();
    // Map staff_count back to staffCount if needed by old controllers
    return depts.map(d => ({
      ...d.toJSON(),
      staffCount: d.staff_count
    }));
  },
  create: async (data) => {
    const newDept = new Department({
      name: data.name,
      head: data.head,
      staff_count: data.staffCount || 0
    });
    const savedDept = await newDept.save();
    return savedDept._id;
  },
  update: async (id, data) => {
    await Department.findByIdAndUpdate(id, {
      name: data.name,
      head: data.head,
      staff_count: data.staffCount
    });
  },
  delete: async (id) => {
    await Department.findByIdAndDelete(id);
  }
};

module.exports = DepartmentModel;
