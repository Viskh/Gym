const Subscription = require("../models/Subscription.model");

module.exports.subscriptionsController = {

  creareSubscription: async (req, res) => {
    try {
      const { name, img, price, time, text } = req.body;

      const subscription = await Subscription.create({
        name: name,
        img: img,
        price: price,
        time: time * 3600 * 24,
        text: text,
        deadTime: (new Date().getTime() / 1000) + (time *3600 * 24)
      });

      res.json( subscription)
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

  deleteSubscription: async (req, res) => {
    try {

      const subscription = await Subscription.findByIdAndRemove(req.params.id)

      res.json(subscription)
      
    } catch (e) {
      res.json(e);
    }
  },

  updateImage: async (req, res) => {
    try {

      await Subscription.findByIdAndUpdate(req.params.id, {
        img: req.file.path,
      });
      const subscription = await Subscription.findById(req.params.id)

      res.status(200).json(subscription)
    } catch(error) {
      res.json(error)
    }
  },

};
