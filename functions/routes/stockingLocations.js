const router = require("express-promise-router")();
const StockingLocationControler = require("../controllers/stockingLocations");
const { hasTokken, isAdmin } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router.route("/").get(hasTokken, StockingLocationControler.getAllLocations);

router
  .route("/add-stock/:locationId")
  .patch(
    [
      hasTokken,
      validateBody(schemas.stockSchema),
      validateParam(schemas.idSchema, "locationId"),
    ],
    StockingLocationControler.addStock
  );

router
  .route("/create-stocking-location")
  .post(
    [isAdmin, validateBody(schemas.stockingLocationSchema)],
    StockingLocationControler.createLocation
  );

router
  .route("/by-field")
  .get(
    [hasTokken, validateBody(schemas.stockingLocationOptionalSchema)],
    StockingLocationControler.findLocationByField
  );

router
  .route("/:locationId")
  .get(
    [hasTokken, validateParam(schemas.idSchema, "locationId")],
    StockingLocationControler.getLocation
  )
  .patch(
    [
      isAdmin,
      validateParam(schemas.idSchema, "locationId"),
      validateBody(schemas.stockingLocationOptionalSchema),
    ],
    StockingLocationControler.updateLocation
  )
  .delete(
    [isAdmin, validateParam(schemas.idSchema, "locationId")],
    StockingLocationControler.deleteLocation
  );
module.exports = router;
