const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
require("dotenv/config");
const app = express();

// DB
mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to the DB!"))
  .catch((err) => console.log(err));

// Routes
const users = require("./routes/users");
const customers = require("./routes/customers");
const products = require("./routes/products");

// Routes
app.use("/users", users);
app.use("/customers", customers);
app.use("/products", products);

// Middlewares
app.use(helmet());
app.use(logger("tiny"));
app.use(cors());
app.use(bodyParser.json());

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  // Respond to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  // Respond to ourselves
  console.error(err);
});

exports.app = functions.https.onRequest(app);
