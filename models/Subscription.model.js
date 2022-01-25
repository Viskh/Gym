const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
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
    }
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
