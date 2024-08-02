const express = require("express");
const app = express();

const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const passportJWT = require("./config/passport-jwt");
const cors = require("cors");
const passport = require("passport");
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    return console.log("There is an error", err);
  }
  console.log(`Server is running on port ${port}`);
});