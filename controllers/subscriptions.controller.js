const Subscription = require("../models/Subscription.model");

module.exports.subscriptionsController = {

  creareSubscription: async (req, res) => {
    try {
      const { name, price, time } = req.body;

      const subscription = await Subscription.create({
        name: name,
        price: price,
        time: time,
      });

      res.json(subscription)

    } catch (e) {
      res.json(e);
    }
  },

  getAllSubscriptions: async (req, res) => {
    try {

      const subscriptions = await Subscription.find()

      res.json(subscriptions)
      
    } catch (e) {
      res.json(e);
    }
  },

};
