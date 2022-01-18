const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },

  registerUser: async (req, res) => {
    try {
      const { login, password, name, weight, img, role } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({
        login: login,
        password: hash,
        name: name,
        weight: weight,
        img: img,
        role: role,
      });

      res.json(user);
    } catch (error) {
      res.json(error);
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const condidate = await User.findOne({ login });

      if (!condidate) {
        return res.status(401).json("неверный логин или пароль");
      }

      const valid = await bcrypt.compare(password, condidate.password);
      if (!valid) {
        return res.status(401).json("неверный логин или пароль");
      }

      const payload = {
        id: condidate._id,
        login: condidate.login,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "21d",
      });

      res.json({
        token,
      });
    } catch (error) {
      res.json(error);
    }
  },
};
