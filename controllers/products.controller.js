const Product = require("../models/Product.model");

module.exports.productsController = {
  addProduct: async (req, res) => {
    try {
      const { name, img, weight, price, description } = req.body;

      const products = await Product.create({
        name: name,
        img: img,
        weight: weight,
        price: price,
        description: description,
      });

      res.json(products);
    } catch (error) {
      res.json(error);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();

      res.json(products);
    } catch (error) {
      res.json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, img, weight, price, description } = req.body;

      const product = await Product.findByIdAndUpdate(req.params.id, {
        name: name,
        img: img,
        weight: weight,
        price: price,
        description: description,
      });

      res.json(product);
    } catch (error) {
      res.json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);

      res.json(product);
    } catch (error) {
      res.json(error);
    }
  },
};
