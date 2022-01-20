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
    },
    img: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    phone: {
      type: Number,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
