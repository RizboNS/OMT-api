const Employee = require("../models/employee");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  adminRegister: async (req, res) => {
    req.value.body.email = req.value.body.email.toLowerCase();
    const emailExist = await Admin.findOne({ email: req.value.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.value.body.password, salt);
    req.value.body.password = hashedPassword;

    const newAdmin = new Admin(req.value.body);
    const savedADmin = await newAdmin.save();
    const token = jwt.sign({ _id: savedADmin._id }, process.env.TOKEN_SECRET);
    res.status(201).send({ token });
  },
  adminLogin: async (req, res) => {
    req.value.body.email = req.value.body.email.toLowerCase();
    const admin = await Admin.findOne({ email: req.value.body.email });
    if (!admin) {
      return res.status(400).json({ error: "Email or password invalid." });
    }
    const validPass = await bcrypt.compare(
      req.value.body.password,
      admin.password
    );
    if (!validPass) {
      return res.status(400).json({ error: "Email or password invalid." });
    }
    const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
    res.status(201).send({ token });
  },
  getAllEmployees: async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
  },
  getEmployee: async (req, res) => {
    const employeeId = req.value.params.employeeId;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee does not exist." });
    }
    res.status(200).json(employee);
  },
  findEmployeeByField: async (req, res) => {
    const fields = req.value.body;
    const keys = Object.keys(fields);

    const field = keys[0];
    const fieldValue = fields[field];

    const employee = await Employee.findOne({ [field]: fieldValue });
    if (!employee) {
      return res.status(404).json({ error: "Employee does not exist." });
    }
    res.status(200).json(employee);
  },
  createEmployee: async (req, res) => {
    const newEmployee = new Employee(req.value.body);
    const savedEmployee = await newEmployee.save();
    res.status(200).send(savedEmployee);
  },
  updateEmployee: async (req, res) => {
    const employeeId = req.value.params.employeeId;
    const newEmployee = req.value.body;
    await Employee.findByIdAndUpdate(employeeId, newEmployee);
    res.status(200).json({ success: true });
  },
  deleteEmployee: async (req, res) => {
    const employeeId = req.value.params.employeeId;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee does not exist." });
    }
    await employee.remove();

    res.status(200).send({ success: true });
  },
};
