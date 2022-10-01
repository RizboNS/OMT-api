const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user } = require("firebase-functions/v1/auth");

module.exports = {
  createAdmin: async (req, res) => {
    req.value.body.email = req.value.body.email.toLowerCase();
    const emailExist = await User.findOne({ email: req.value.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.value.body.password, salt);
    req.value.body.password = hashedPassword;
    const newUser = new User(req.value.body);
    newUser.role = "ADMIN";
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { _id: savedUser._id, role: "ADMIN" },
      process.env.TOKEN_SECRET
    );
    res.status(201).send({ token });
  },
  createUser: async (req, res) => {
    req.value.body.email = req.value.body.email.toLowerCase();
    const emailExist = await User.findOne({ email: req.value.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.value.body.password, salt);
    req.value.body.password = hashedPassword;
    const newUser = new User(req.value.body);
    newUser.role = "USER";
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { _id: savedUser._id, role: "USER" },
      process.env.TOKEN_SECRET
    );
    res.status(201).send({ token });
  },
  login: async (req, res) => {
    req.value.body.email = req.value.body.email.toLowerCase();
    const user = await User.findOne({ email: req.value.body.email });
    if (!user) {
      return res.status(400).send("Email or password invalid.");
    }
    const validPass = await bcrypt.compare(
      req.value.body.password,
      user.password
    );
    if (!validPass) {
      return res.status(400).send("Email or password invalid.");
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.TOKEN_SECRET
    );
    res.status(201).send({ token });
  },
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  },
  updateUser: async (req, res) => {
    const userId = req.value.params.userId;
    const newUser = req.value.body;

    const user = await User.findByIdAndUpdate(userId, newUser);
    if (!user) {
      return res.status(404).json({ error: "User does not exist." });
    }
    res.status(200).json(user);
  },
  deleteUser: async (req, res) => {
    const userId = req.value.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User does not exist." });
    }
    await user.remove();

    res.status(200).send({ success: true });
  },
};
