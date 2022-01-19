const { usersController } = require("../controllers/users.controller");
const { Router } = require("express");

const router = Router();

router.get("/users", usersController.getAllUsers);
router.get("/user/:id", usersController.getUserById)
router.post("/users/register", usersController.registerUser);
router.post("/users/login", usersController.login);

module.exports = router;
