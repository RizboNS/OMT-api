const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  employeeId: {
    type: String,
    required: true,
    min: 8,
    max: 8,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  ordersEdited: [
    {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
