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
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: "shipTo",
    },
  ],
});

const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
