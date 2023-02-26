const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    mobile_number: String,
    email: String,
    password: String,
    picture: String
  })
);

exports.User = User;