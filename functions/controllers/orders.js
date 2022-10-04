const Order = require("../models/order");
const Customer = require("../models/customer");

module.exports = {
  getAllOrders: async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders);
  },
  getOrder: async (req, res) => {
    const orderId = req.value.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order does not exist." });
    }
    res.status(200).json(order);
  },
  findOrdersByField: async (req, res) => {
    const fields = req.value.body;
    const keys = Object.keys(fields);

    const field = keys[0];
    const fieldValue = fields[field];
    let findObj = {};
    if (field == "updatedAt" || field == "createdAt") {
      const compareBy = fields[field].compareBy;
      const time = fields[field].time;
      if (compareBy != undefined) {
        findObj = {
          [field]: {
            [compareBy]: time,
          },
        };
      } else {
        findObj = {
          [field]: time,
        };
      }
    } else if (field == "updatedBy") {
      findObj = {
        "updatedBy._id": fieldValue,
      };
    } else if (field == "customer") {
      findObj = {
        customer: fieldValue,
      };
    } else {
      findObj = {
        [field]: new RegExp(fieldValue, "i"),
      };
    }
    const orders = await Order.find(findObj);
    if (!orders) {
      return res.status(404).json({ error: "Orders not found." });
    }
    res.status(200).json(orders);
  },
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
  fulfillOrder: async (req, res) => {
    const orderId = req.value.params.orderId;
    const userId = req.user._id;
    const order = await Order.findById(orderId);

    order.status = "fulfilled";
    order.updatedBy.push(userId);
    order.updatedBy.push({
      _id: userId,
      note: "Order fulfilled with note: " + req.body.note,
    });
    if (order.userOwner.length > 0) {
      order.userOwner.pop();
    }
    await order.save();
    if (!order) {
      return res.status(400).json({ error: "Failed to fulfill order." });
    }
    res.status(200).json(order);
  },
  processOrder: async (req, res) => {
    const orderId = req.value.params.orderId;
    const userId = req.user._id;
    const order = await Order.findById(orderId);

    order.status = "processed";
    order.updatedBy.push(userId);
    order.updatedBy.push({
      _id: userId,
      note: "Order processed with note: " + req.body.note,
    });
    if (order.userOwner.length > 0) {
      order.userOwner.pop();
    }
    await order.save();
    if (!order) {
      return res.status(400).json({ error: "Failed to process order." });
    }
    // SEND ORDER TO CARRIER METHOD HERE
    res.status(200).json(order);
  },
};
