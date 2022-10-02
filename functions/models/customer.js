const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    max: 20,
  },
  address: {
    type: String,
    reqruired: true,
    max: 255,
  },
  city: {
    type: String,
    required: true,
    max: 255,
  },
  state: {
    type: String,
    required: true,
    max: 255,
  },
  zip: {
    type: String,
    required: true,
    max: 5,
    min: 5,
  },
});

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
