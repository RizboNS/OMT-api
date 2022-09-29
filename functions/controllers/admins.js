const Employee = require("../models/employee")

module.exports = {
  createEmployee: async (req, res) => {
    const newEmployee = new Employee(req.value.body)
    const savedEmployee = await newEmployee.save();

    res.status(200).send(savedEmployee)
  },
  deleteEmployee: async (req, res) => {
    const employeeId = req.value.params.employeeId;
    console.log("from controller", employeeId)
    res.status(200).send('Test')
  }
};

