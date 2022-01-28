const Trainer = require("../models/Trainer.model");

module.exports.trainersController = {
  createTrainer: async (req, res) => {
    try {
      const { name, description, img, rating, coefficient, vocation } = req.body;

      const trainer = await Trainer.create({
        name: name,
        description: description,
        img: img,
        rating: rating,
        coefficient: coefficient,
        vocation: vocation,
      });
      res.json(trainer);
    } catch (error) {
      res.json(error);
    }
  },
  getAllTrainers: async (req, res) => {
    try {
      const trainer = await Trainer.find();
      res.json(trainer);
    } catch (error) {
      res.json(error);
    }
  },
  updateTrainer: async (req, res) => {
    try {
      const { name, description, img, rating, coefficient } = req.body;
      const trainer = await Trainer.findByIdAndUpdate(req.params.id, {
        name: name,
        description: description,
        img: img,
        rating: rating,
        coefficient: coefficient,
      });
      res.json(trainer);
    } catch (error) {
      res.json(error);
    }
  },
  deleteTrainer: async (req, res) => {
    try {
      await Trainer.findByIdAndRemove(req.params.id);
      res.json("Тренер успешно удален");
    } catch (error) {
      res.json(error);
    }
  },

  updateImg: async (req, res) => {
    try {
      await Trainer.findByIdAndUpdate(req.params.id, {
        img: req.file.path,
      });
      const trainer = await Trainer.findById(req.params.id);

      res.status(200).json(trainer);
    } catch (error) {
      res.json(error);
    }
  },
};