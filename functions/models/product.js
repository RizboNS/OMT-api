const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 30,
  },
  productNumber: {
    type: String,
    required: true,
    max: 8,
    min: 8,
  },
  boxSize: {
    type: String,
    required: true,
    max: 255,
  },
  weight: {
    type: String,
    required: true,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    max: 255,
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
