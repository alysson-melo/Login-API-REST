const authController = require("../controllers/authController")
const { Router } = require('express')
const router = Router()

router.post("/login", authController.login) // rota aberta

router.post("/refresh", authController.refresh)

router.post("/logout", authController.logout)

module.exports = router