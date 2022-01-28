const mongoose = require("mongoose");

const trainerSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    img: {
      type: String,
      default: null,
    },
    rating: Number,
    coefficient: Number,
    vocation: String,
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
