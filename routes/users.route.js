const { usersController } = require("../controllers/users.controller");
const { Router } = require("express");

const router = Router();

router.get("/users", usersController.getAllUsers);
router.get("/profile/user/:id", usersController.getUserById);
router.get("/users/login", usersController.login);
router.post("/users/register", usersController.registerUser);

module.exports = router;
