const router = require("express-promise-router")();
const OrderControler = require("../controllers/orders");
const { hasTokken, isAdmin } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router
  .route("/create-order/:customerId")
  .post(
    [hasTokken, validateParam(schemas.idSchema, "customerId")],
    OrderControler.createOrder
  );

router
  .route("/open-order/:orderId")
  .patch(
    [hasTokken, validateParam(schemas.idSchema, "orderId")],
    OrderControler.openOrder
  );

router
  .route("/close-order/:orderId")
  .patch([
    hasTokken,
    validateParam(schemas.idSchema, "orderId"),
    OrderControler.closeOrder,
  ]);

router
  .route("/cancel-order/:orderId")
  .patch([
    hasTokken,
    validateParam(schemas.idSchema, "orderId"),
    OrderControler.cancelOrder,
  ]);

module.exports = router;
