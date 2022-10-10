const router = require("express-promise-router")();
const OrderControler = require("../controllers/orders");
const { hasTokken, isAdmin } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router.route("/").get(hasTokken, OrderControler.getAllOrders);

router
  .route("/by-field")
  .post(
    [hasTokken, validateBody(schemas.orderOptionalSchema)],
    OrderControler.findOrdersByField
  );

router
  .route("/:orderId")
  .get(
    [hasTokken, validateParam(schemas.idSchema, "orderId")],
    OrderControler.getOrder
  );

router
  .route("/create-order/:customerId")
  .post(
    [
      hasTokken,
      validateParam(schemas.idSchema, "customerId"),
      validateBody(schemas.orderOptionalSchema),
    ],
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

router
  .route("/fulfill-order/:orderId")
  .patch([
    hasTokken,
    validateParam(schemas.idSchema, "orderId"),
    OrderControler.fulfillOrder,
  ]);

router
  .route("/process-order/:orderId")
  .patch([
    hasTokken,
    validateParam(schemas.idSchema, "orderId"),
    OrderControler.processOrder,
  ]);

module.exports = router;
