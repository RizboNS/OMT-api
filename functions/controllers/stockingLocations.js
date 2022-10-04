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
  addStock: async (req, res) => {
    const locationId = req.value.params.locationId;
    const location = await StockingLocation.findById(locationId);
    const newProduct = req.value.body;

    if (!location) {
      res.status(404).json({ error: "Stocking location not found." });
    }

    // const product = location.productsInStock.find((value) => value._id == newProduct._id));
    console.log(product);
    location.productsInStock.push(newProduct);
    await location.save();
    res.status(200).json(location);
  },
};
