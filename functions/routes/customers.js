const router = require("express-promise-router")();
const CustomerControler = require("../controllers/customers");
const { hasTokken, isAdmin } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router.route("/").get(hasTokken, CustomerControler.getAllCustomers);

router
  .route("/create-customer")
  .post(
    [hasTokken, validateBody(schemas.customerSchema)],
    CustomerControler.createCustomer
  );

router
  .route("/by-field")
  .get(
    [hasTokken, validateBody(schemas.customerOptionalSchema)],
    CustomerControler.findCustomerByField
  );

router
  .route("/:customerId")
  .get(
    [hasTokken, validateParam(schemas.idSchema, "customerId")],
    CustomerControler.getCustomer
  );
module.exports = router;
