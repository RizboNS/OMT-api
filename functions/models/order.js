const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customer: [
      {
        type: Schema.Types.ObjectId,
        ref: "customer",
      },
    ],
    stockingLocation: {
      type: Schema.Types.ObjectId,
      ref: "stockingLocation",
    },
    status: {
      type: String,
      required: true,
      max: 255,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    closedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    canceledBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    processedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    userOwner: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    updatedBy: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        updatedTime: {
          type: Date,
          default: Date.now(),
        },
        note: {
          type: String,
          max: 255,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;
