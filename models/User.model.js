const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: String,
  password: String,
  name: String,
  weight: Number,
  img: {
    type: String,
    default: Number,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
