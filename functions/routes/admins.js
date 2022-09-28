const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admins");

router.post("/create-admin", AdminController.createAdmin);

module.exports = router;