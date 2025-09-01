const { Router } = require('express')
const router = Router()
const loginController = require("../controllers/loginController")

router.post("/users", loginController.createNewUser)

router.get("/users", loginController.listAllUsers)

router.get("/users/:id", loginController.listUser)

router.put("/users/:id", loginController.updateUser)

router.delete("/users/:id", loginController.deleteUser)

module.exports = router