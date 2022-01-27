const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    deadTime: {
      type: Number,
      required: true
    }
  },
  { timestamps: {
    currentTime: () => Math.floor(Date.now() / 1000)
    }}
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
