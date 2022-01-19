const Subscription = require("../models/Subscription.model");

module.exports.subscriptionsController = {

  creareSubscription: async (req, res) => {
    try {
      const { name, img, price, time, text } = req.body;

      const subscription = await Subscription.create({
        name: name,
        img: img,
        price: price,
        time: time,
        text: text,
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
