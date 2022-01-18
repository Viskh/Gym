const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
    },
    subscription: {
      ref: "Subscription",
      type: mongoose.SchemaTypes.ObjectId,
    },
    trainer: {
      ref: "Trainer",
      type: mongoose.SchemaTypes.ObjectId,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
