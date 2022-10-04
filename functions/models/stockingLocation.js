const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockingLocationSchema = new Schema({
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
  productsInStock: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const StockingLocation = mongoose.model(
  "stockingLocation",
  stockingLocationSchema
);
module.exports = StockingLocation;
