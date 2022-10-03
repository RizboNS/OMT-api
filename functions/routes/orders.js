const router = require("express-promise-router")();
const OrderControler = require("../controllers/orders");
const { hasTokken } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router
  .route("/create-order")
  .post(
    [hasTokken, validateBody(schemas.orderSchema)],
    OrderControler.createOrder
  );

module.exports = router;
