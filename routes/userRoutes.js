const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const { Router } = require('express')
const router = Router()

router.post("/users", userController.createNewUser) //rota aberta

router.get("/users", authMiddleware, userController.listAllUsers)

router.get("/users/:id", authMiddleware, userController.findUserById)

router.put("/users/:id", authMiddleware, userController.updateUser)

router.delete("/users/:id", authMiddleware, userController.deleteUser)

module.exports = router