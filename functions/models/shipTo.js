const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipToSchema = new Schema({
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

const ShipTo = mongoose.model("shipTo", shipToSchema);
module.exports = ShipTo;
