const Cart = require("../models/Cart.model");
const jwt = require("jsonwebtoken");

module.exports.cartsController = {
  getCartById: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });
      res.json(cart);
    } catch (e) {
      res.json(e);
    }
  },
  deleteCart: async (req,res)=> {
    const {id} = req.params
    try {
      const cart = await Cart.findById(id)

      if(req.user.id !== cart.user.toString()) {
        return res.status(401).json('Ошибка. Нет доступа')
      }
      if (cart.user.toString() === req.user.id) {
        await cart.remove()
        return res.json('Удалено')
      }
      return res.status(401).json('Ошибка. Нет доступа')
    }
    catch (e) {
      res.status(401).json(`Ошибка: ${e.toString()}`)
    }
  },
  addCart: async (req, res) => {
    try {
      await Cart.create({
        user: req.body.user,
        subscription: req.body.subscription,
        trainer: req.body.trainer,
      });
      res.json("корзина создана");
    } catch (e) {
      res.json(e);
    }
  },
  updateCart: async (req, res) => {
    try {
      await Cart.findByIdAndUpdate(req.params.id, {
        subscription: req.body.subscription,
        trainer: req.body.trainer,
      });
      res.json("Корзина изменена");
    } catch (e) {
      res.json(e);
    }
  },
  cartToken: async (req, res) => {
    try {
      const { subscription, trainer } = req.body;
      const { authorization } = req.headers;
      const [type, token] = authorization.split("");
      if (type !== "Bearer") {
        return res.status(400).json("Неверный тип токена");
      }
      const payload = await jwt.verify(token, process.env.Secret_JWT_KEY);

      const cart = await Cart.create({
        user: payload.id,
        subscription,
        trainer,
      });
      return res.json(cart);
    } catch (e) {
      res.status(401).json("Неверный токен");
    }
  },
};
