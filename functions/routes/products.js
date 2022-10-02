const router = require("express-promise-router")();
const ProductControler = require("../controllers/products");
const { hasTokken, isAdmin } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router.route("/").get(hasTokken, ProductControler.getAllProducts);

router
  .route("/create-product")
  .post(
    [isAdmin, validateBody(schemas.productSchema)],
    ProductControler.createProduct
  );

router
  .route("/by-field")
  .get(
    [hasTokken, validateBody(schemas.productSchemaOptional)],
    ProductControler.findProductByField
  );

router
  .route("/:productId")
  .get(
    [hasTokken, validateParam(schemas.idSchema, "productId")],
    ProductControler.getProduct
  )
  .patch(
    [
      isAdmin,
      validateParam(schemas.idSchema, "productId"),
      validateBody(schemas.productSchemaOptional),
    ],
    ProductControler.updateProduct
  )
  .delete(
    [isAdmin, validateParam(schemas.idSchema, "productId")],
    ProductControler.deleteProduct
  );

module.exports = router;
