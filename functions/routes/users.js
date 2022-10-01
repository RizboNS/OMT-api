const router = require("express-promise-router")();
const UserController = require("../controllers/users");
const { hasTokken, isAdmin } = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router.route("/").get(hasTokken, UserController.getAllUsers);

router
  .route("/login")
  .post(validateBody(schemas.userLoginSchema), UserController.login);

router
  .route("/create-admin")
  .post(
    [isAdmin, validateBody(schemas.userSchema)],
    UserController.createAdmin
  );

router
  .route("/create-user")
  .post([isAdmin, validateBody(schemas.userSchema)], UserController.createUser);

router
  .route("/by-field")
  .get(
    [hasTokken, validateBody(schemas.userOptionalSchemaFind)],
    UserController.findUserByField
  );
router
  .route("/:userId")
  .get(
    [hasTokken, validateParam(schemas.idSchema, "userId")],
    UserController.getUser
  )
  .patch(
    [
      isAdmin,
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userOptionalSchema),
    ],
    UserController.updateUser
  )
  .delete(
    [isAdmin, validateParam(schemas.idSchema, "userId")],
    UserController.deleteUser
  );

module.exports = router;
