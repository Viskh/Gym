const Cart = require("../models/Cart.model");
const Subscription = require("../models/Subscription.model");

const jwt = require("jsonwebtoken");

module.exports.cartsController = {
  getAllCarts: async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (error) {
      res.json(error);
    }
  },

  getCartById: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.params.id });
      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },


  addCart: async (req, res) => {
    try {
      const cart = await Cart.create({
        user: req.body.user,
      });
      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },

  addTrainerCart: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        trainer: req.body.trainer,
      });
      const cart = await Cart.findById(req.params.id);
      res.json(cart);

    } catch (e) {
      res.json(e);
    }
  },

  addCartItem: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        trainer: req.body.trainer,
        $push: {
          productsCart: {
            product: req.body.product,
            amount: req.body.amount,
            price: req.body.price,
          },
        },
      });
      const cart = await Cart.findById(req.params.id);
      res.json(cart);

    } catch (e) {
      res.json(e);
    }
  },

  addCartSubscription: async (req ,res) => {
    const startTime = new Date().getTime() / 1000;
    const subsc = await Subscription.findById(req.body.subscription);
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        subscription: req.body.subscription,
        subscriptionDeadTime: subsc.time + startTime,
      });
      const cart = await Cart.findById(req.params.id);
      res.json(cart);

    }catch (e) {
      res.json(e)
    }
  },
  deleteCartItem: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        $pull: {
          productsCart: {
            product: req.body.product,
          },
        },
      });

      const cart = await Cart.findById(req.params.id);

      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },

  increaseProductAmount: async (req, res) => {
    try {
      await Cart.updateOne(
        { _id: req.params.id, "productsCart.product": req.body.product },
        { $inc: { "productsCart.$.amount": 1 } }
      );

      const cart = await Cart.findById(req.params.id);

      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },

  decreaseProductAmount: async (req, res) => {
    try {
      await Cart.updateOne(
        { _id: req.params.id, "productsCart.product": req.body.product },
        { $inc: { "productsCart.$.amount": -1 } }
      );

      const cart = await Cart.findById(req.params.id);

      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },

  deleteCart: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        $pull: {
          productsCart: {},
        },
      });

      const cart = await Cart.findById(req.params.id);

      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },

};
