const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

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
const admins = require("./routes/admins");

// Routes
app.use("/admins", admins)

// Middlewares
app.use(cors());
app.use(bodyParser.json());


exports.app = functions.https.onRequest(app);
