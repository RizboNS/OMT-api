const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createProduct: async (req, res) => {
    const newProduct = new Product(req.value.body);
    const savedProduct = await newProduct.save();

    if (!savedProduct) {
      return res.status(400).json({ error: "Failed to create product" });
    }
    res.status(200).json(savedProduct);
  },
  getAllProducts: async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  },
  getProduct: async (req, res) => {
    const productId = req.value.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product does not exist." });
    }
    res.status(200).json(product);
  },
  findProductByField: async (req, res) => {
    const fields = req.value.body;
    const keys = Object.keys(fields);

    const field = keys[0];
    const fieldValue = fields[field];

    const product = await Product.findOne({
      [field]: new RegExp(fieldValue, "i"),
    });
    if (!product) {
      return res.status(404).json({ error: "Product does not exist." });
    }
    res.status(200).json(product);
  },
  updateProduct: async (req, res) => {
    const productId = req.value.params.productId;
    const newProduct = req.value.body;
    const product = await Product.findByIdAndUpdate(productId, newProduct);
    if (!product) {
      return res.status(404).json({ error: "Product does not exist." });
    }
    res.status(200).json({ success: true });
  },
  deleteProduct: async (req, res) => {
    const productId = req.value.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product does not exist" });
    }
    await product.remove();
    res.status(200).json({ success: true });
  },
};
