const DepartmentModel = require('../models/DepartmentModel');

exports.getDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.getAll();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const id = await DepartmentModel.create(req.body);
    res.status(201).json({ id, message: 'Department created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    await DepartmentModel.update(req.params.id, req.body);
    res.json({ message: 'Department updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    await DepartmentModel.delete(req.params.id);
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
