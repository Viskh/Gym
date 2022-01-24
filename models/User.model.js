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
    },
    age: {
      type: String,
      default: "xx"
    },
    aboutMe: {
      type: String,
      default: "Быть идеальным тоже непросто. Если ты сильный, ты очень " +
        "скоро остаёшься один и становишься заносчивым, даже если " +
        "изначально ты давал людям все, чего от тебя ожидали"
    },
    purposeTrain: {
      type: String,
      default: "Держать себя в форме, #антижир"
    },
    favoriteQuote: {
      type: String,
      default: "Ave Caesar, imperator, morituri te salutant"
    },
    slogan: {
      type: String,
      default: "Цель быть лучше себя вчерашнего!"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
