const Order = require("../models/order");

module.exports = {
  createOrder: async (req, res) => {
    const newOrder = new Order(req.value.body);
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
      return res.status(400).json({ error: "Failed to create order." });
    }
    res.status(200).json(savedOrder);
  },
};
