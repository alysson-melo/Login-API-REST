const { Router } = require('express')
const router = Router()
const loginController = require("../controllers/loginController")

router.get("/users", loginController.listAllUsers)

router.get("/users/:id", loginController.listUser)

router.post("/users", loginController.createNewUser)

router.post("/users/login", loginController.loginUser)

router.put("/users/:id", loginController.updateUser)

router.delete("/users/:id", loginController.deleteUser)

module.exports = router