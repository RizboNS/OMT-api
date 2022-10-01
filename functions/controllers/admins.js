// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// module.exports = {
//   getUser: async (req, res) => {
//     const userId = req.value.params.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User does not exist." });
//     }
//     res.status(200).json(user);
//   },
//   findUserByField: async (req, res) => {
//     const fields = req.value.body;
//     const keys = Object.keys(fields);

//     const field = keys[0];
//     const fieldValue = fields[field];

//     const employee = await Employee.findOne({ [field]: fieldValue });
//     if (!employee) {
//       return res.status(404).json({ error: "Employee does not exist." });
//     }
//     res.status(200).json(employee);
//   },

// };
