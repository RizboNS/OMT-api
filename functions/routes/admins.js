const router = require("express-promise-router")();
const AdminController = require("../controllers/admins");
const verify = require("../routes/verifyToken");
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routeHelpers");

router
  .route("/login")
  .post(validateBody(schemas.userLoginSchema), AdminController.adminLogin);

router
  .route("/register")
  .post(validateBody(schemas.employeeSchema), AdminController.adminRegister);

router.route("/all-employees").get(AdminController.getAllEmployees);

router
  .route("/get-employee/:employeeId")
  .get(
    validateParam(schemas.idSchema, "employeeId"),
    AdminController.getEmployee
  );

router
  .route("/get-employee-by-field")
  .get(
    validateBody(schemas.employeeOptionalSchemaFind),
    AdminController.findEmployeeByField
  );
router
  .route("/update-employee/:employeeId")
  .patch(
    [
      validateParam(schemas.idSchema, "employeeId"),
      validateBody(schemas.employeeOptionalSchema),
    ],
    AdminController.updateEmployee
  );

router
  .route("/create-employee")
  .post(validateBody(schemas.employeeSchema), AdminController.createEmployee);
router
  .route("/delete-employee/:employeeId")
  .delete(
    validateParam(schemas.idSchema, "employeeId"),
    AdminController.deleteEmployee
  );

module.exports = router;
