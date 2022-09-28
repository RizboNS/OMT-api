const Employee = require("../models/employee")

module.exports = {
  createAdmin: async (req, res) => {
    const newEmployee = new Employee(req.body)
    const savedEmployee = await newEmployee.save();

    res.status(200).send(savedEmployee)
  },
};

