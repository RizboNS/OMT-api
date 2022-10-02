const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createCustomer: async (req, res) => {
    req.value.body.email = req.value.body.email.toLowerCase();
    const emailExist = await Customer.findOne({ email: req.value.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists." });
    }
    const newCustomer = new Customer(req.value.body);
    const savedCustomer = await newCustomer.save();
    if (!savedCustomer) {
      return res.status(400).json({ error: "Failed to create customer" });
    }
    res.status(200).json(savedCustomer);
  },
  getAllCustomers: async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
  },
  getCustomer: async (req, res) => {
    const customerId = req.value.params.customerId;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer does not exist." });
    }
    res.status(200).json(customer);
  },
  findCustomerByField: async (req, res) => {
    const fields = req.value.body;
    const keys = Object.keys(fields);

    const field = keys[0];
    const fieldValue = fields[field];

    const customer = await Customer.findOne({
      [field]: new RegExp(fieldValue, "i"),
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer does not exist." });
    }
    res.status(200).json(customer);
  },
  updateCustomer: async (req, res) => {
    const customerId = req.value.params.customerId;
    const newCustomer = req.value.body;
    const customer = await Customer.findByIdAndUpdate(customerId, newCustomer);
    if (!customer) {
      return res.status(404).json({ error: "Customer does not exist." });
    }
    res.status(200).json({ success: true });
  },
  deleteCustomer: async (req, res) => {
    const customerId = req.value.params.customerId;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Customer does not exist" });
    }
    await customer.remove();
    res.status(200).json({ success: true });
  },
};
