// const router = require("express-promise-router")();
// const AdminController = require("../controllers/admins");
// const verify = require("../routes/verifyToken");
// const {
//   validateParam,
//   schemas,
//   validateBody,
// } = require("../helpers/routeHelpers");

// router
//   .route("/login")
//   .post(validateBody(schemas.userLoginSchema), AdminController.adminLogin);

// router
//   .route("/register")
//   .post(validateBody(schemas.userSchema), AdminController.adminRegister);

// router.route("/all-employees").get(AdminController.getAllEmployees);

// router
//   .route("/get-employee/:employeeId")
//   .get(
//     validateParam(schemas.idSchema, "employeeId"),
//     AdminController.getEmployee
//   );

// router
//   .route("/get-employee-by-field")
//   .get(
//     validateBody(schemas.userOptionalSchemaFind),
//     AdminController.findEmployeeByField
//   );

// router
//   .route("/create-employee")
//   .post(validateBody(schemas.userSchema), AdminController.createEmployee);

// module.exports = router;
