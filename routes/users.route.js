const { usersController } = require("../controllers/users.controller");
const { Router } = require("express");
const addFileMiddleware = require("../middlewares/addFile.middleware");
const authMiddlewares = require("../middlewares/auth.middlewares");

const router = Router();

router.get("/users", usersController.getAllUsers);
router.get("/profile/user/:id", authMiddlewares, usersController.getUserById);
router.post("/users/login", usersController.login);
router.post("/users/register", usersController.registerUser);
router.patch('/users/:id', addFileMiddleware.single('img'), usersController.updateImg);
router.patch('/profile/update/:id', usersController.updateUserInfo)

module.exports = router;
