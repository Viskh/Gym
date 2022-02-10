const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true
    },
    img: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    tel: {
      type: Number,
    },
    age: {
      type: Number,
    },
    purposeTrain: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
