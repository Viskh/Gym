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
  getUserById: async (req,res) => {
    try {
      const {id} = req.params
      const user = await User.findById(id)
      res.json(user)
    }catch (e) {
      res.json(e)
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, password, name, weight, img, role } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({
        email: email,
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
      const { email, password } = req.body;

      const condidate = await User.findOne({ email });

      if (!condidate) {
        return res.status(401).json("неверный логин или пароль");
      }

      const valid = await bcrypt.compare(password, condidate.password);
      if (!valid) {
        return res.status(401).json("неверный логин или пароль");
      }

      const payload = {
        id: condidate._id,
        email: condidate.email,
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
