const StockingLocation = require("../models/stockingLocation");

module.exports = {
  createLocation: async (req, res) => {
    const newLocation = new StockingLocation(req.value.body);
    const savedLocation = await newLocation.save();

    if (!savedLocation) {
      return res
        .status(400)
        .json({ error: "Failed to create Stocking Location" });
    }
    res.status(200).json(savedLocation);
  },
  getAllLocations: async (req, res) => {
    const locations = await StockingLocation.find();
    res.status(200).json(locations);
  },
  getLocation: async (req, res) => {
    const locationId = req.value.params.locationId;
    const location = await StockingLocation.findById(locationId);

    if (!location) {
      return res
        .status(404)
        .json({ error: "Stocking location does not exist." });
    }
    res.status(200).json(location);
  },
  findLocationByField: async (req, res) => {
    const fields = req.value.body;
    const keys = Object.keys(fields);

    const field = keys[0];
    const fieldValue = fields[field];

    const location = await StockingLocation.findOne({
      [field]: new RegExp(fieldValue, "i"),
    });
    if (!location) {
      return res
        .status(404)
        .json({ error: "Stocking Location does not exist." });
    }
    res.status(200).json(location);
  },
  updateLocation: async (req, res) => {
    const locationId = req.value.params.locationId;
    const newLocation = req.value.body;
    const location = await StockingLocation.findByIdAndUpdate(
      locationId,
      newLocation
    );
    if (!location) {
      return res
        .status(404)
        .json({ error: "Stocking location does not exist." });
    }
    res.status(200).json({ success: true });
  },
  deleteLocation: async (req, res) => {
    const locationId = req.value.params.locationId;
    const location = await StockingLocation.findById(locationId);

    if (!location) {
      return res
        .status(404)
        .json({ error: "Stocking location does not exist" });
    }
    await location.remove();
    res.status(200).json({ success: true });
  },
  getStock: async (req, res) => {
    const productId = req.value.params.productId;
    let stock = [];
    const stockLocationsWithStock = await StockingLocation.find({
      "productsInStock._id": productId,
    });

    stockLocationsWithStock.forEach((stockingLocation) => {
      stockingLocation.productsInStock.forEach((el) => {
        if (el._id == productId) {
          stock.push({
            _id: el._id,
            quantity: el.quantity,
            stockingLocationInfo: {
              _id: stockingLocation._id,
              address: stockingLocation.address,
              city: stockingLocation.city,
              state: stockingLocation.state,
              zip: stockingLocation.zip,
            },
          });
        }
      });
    });
    res.status(200).json(stock);
  },
  addStock: async (req, res) => {
    const locationId = req.value.params.locationId;
    const location = await StockingLocation.findById(locationId);
    const newProduct = req.value.body;

    if (!location) {
      res.status(404).json({ error: "Stocking location not found." });
    }
    let product;
    let productIndex = 0;
    for (let i = 0; i < location.productsInStock.length; i++) {
      const element = location.productsInStock[i];
      if (element._id == newProduct._id) {
        product = element;
        productIndex = i;
        break;
      }
    }
    if (product == undefined) {
      location.productsInStock.push(newProduct);
    } else {
      product.quantity = product.quantity + newProduct.quantity;
      location.productsInStock.splice(productIndex, 1, product);
    }
    await location.save();
    res.status(200).json(location);
  },
};
