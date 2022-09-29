const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admins");
const {
    validateParam, schemas, validateBody
} = require("../helpers/routeHelpers")

// router.post("/create-employee", AdminController.createAdmin);

router.route("/create-employee")
    .post(validateBody(schemas.employeeSchema), AdminController.createEmployee);
router.route("/delete-employee/:employeeId")
    .delete(validateParam(schemas.idSchema, "employeeId"), AdminController.deleteEmployee);

module.exports = router;