const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  role: {
    type: String,
    required: true,
    max: 10,
  },
  ordersEdited: [
    {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
