const userController = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")
const { Router } = require('express')
const router = Router()

router.post("/users", userController.createNewUser) // rota aberta

router.get("/users", authMiddleware, roleMiddleware("admin"), userController.listAllUsers)

router.get("/users/:id", authMiddleware, roleMiddleware(["admin", "user"]), userController.findUserById)

router.put("/users/:id", authMiddleware, roleMiddleware(["admin", "user"]), userController.updateUser)

router.delete("/users/:id", authMiddleware, roleMiddleware(["admin", "user"]), userController.deleteUser)

module.exports = router