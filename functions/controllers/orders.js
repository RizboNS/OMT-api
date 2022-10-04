const Order = require("../models/order");
const Customer = require("../models/customer");
const { date } = require("joi");
module.exports = {
  createOrder: async (req, res) => {
    const userId = req.user._id;
    const customerId = req.value.params.customerId;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ error: "Failed to create order - Customer error." });
    }
    const newOrder = new Order({
      createdBy: userId,
      status: "pending",
    });
    newOrder.customer = customer._id;
    newOrder.updatedBy.push({ _id: userId, note: "Order created." });
    const savedOrder = await newOrder.save();
    if (!savedOrder) {
      return res.status(400).json({ error: "Failed to create order." });
    }
    res.status(200).json(savedOrder);
  },
  openOrder: async (req, res) => {
    const orderId = req.value.params.orderId;
    const userId = req.user._id;
    const order = await Order.findById(orderId);
    if (
      order.status == "closed" ||
      order.status == "cancelled" ||
      order.status == "processed" ||
      order.status == "fulfilled"
    ) {
      return res.status(400).json({
        error: "Only orders with status 'pending' or 'open' can be opened.",
      });
    }
    order.status = "open";
    if (order.userOwner.length > 0) {
      order.userOwner.pop();
    }
    order.userOwner.push(userId);
    order.updatedBy.push({
      _id: userId,
      note: "Order status changed to 'open'.",
    });
    await order.save();
    if (!order) {
      return res.status(400).json({ error: "Failed to open order." });
    }
    res.status(200).json(order);
  },
  closeOrder: async (req, res) => {
    const orderId = req.value.params.orderId;
    const userId = req.user._id;
    const order = await Order.findById(orderId);
    if (
      order.status == "cancelled" ||
      order.status == "processed" ||
      order.status == "fulfilled"
    ) {
      return res.status(400).json({
        error: "Only orders with status 'pending' or 'open' can be closed.",
      });
    }
    order.status = "closed";
    order.updatedBy.push({
      _id: userId,
      note: "Order status changed to 'closed' with note: " + req.body.note,
    });
    if (order.userOwner.length > 0) {
      order.userOwner.pop();
    }
    await order.save();
    if (!order) {
      return res.status(400).json({ error: "Failed to close order." });
    }
    res.status(200).json(order);
  },
  cancelOrder: async (req, res) => {
    const orderId = req.value.params.orderId;
    const userId = req.user._id;
    const order = await Order.findById(orderId);

    order.status = "cancelled";
    order.updatedBy.push(userId);
    order.updatedBy.push({
      _id: userId,
      note: "Order cancelled with note: " + req.body.note,
    });
    if (order.userOwner.length > 0) {
      order.userOwner.pop();
    }
    await order.save();
    if (!order) {
      return res.status(400).json({ error: "Failed to cancel order." });
    }
    res.status(200).json(order);
  },
};
