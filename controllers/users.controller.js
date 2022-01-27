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
      const { email, password, name, weight, img, role, phone, age, purposeTrain } = req.body;

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
        phone: phone,
        age: age,
        purposeTrain: purposeTrain
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
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "21d",
      });

      res.json({
        token: token,
        id: condidate._id
      });
    } catch (error) {
      res.json(error.status(401).json(error.toString()));
    }
  },

  updateImg: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        img: req.file.path,
      });
      const user = await User.findById(req.params.id);

      res.status(200).json(user);
    } catch (error) {
      res.json(error);
    }
  },
  updateUserInfo: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $set: {...req.body},
      });
      const user = await User.findByid(req.user.id);
      res.status(200).json(user)
    }catch (e) {
      res.json(e)
    }
  }
};
