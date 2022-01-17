const mongoose = require('mongoose')

const subscriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
   price: {
     type: Number,
   },
   time: {
     type: Number,
   },
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

module.exports = Subscription