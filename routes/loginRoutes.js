const { Router } = require('express')
const router = Router()
const loginController = require("../controllers/loginController")

router.get("/users", (req, res) => {
    const response = loginController.read()
    res.send(response)
})

router.post("/users", (req, res) => {
    const response = loginController.create()
    res.send(response)
})

router.put("/user:id", (req, res) => {
    const { id } = req.params
    const response = loginController.update(id)
    res.send(response)
})

router.delete("/user:id", (req, res) => {
    const { id } = req.params
    const response = loginController.delete(id)
    res.send(response)
})

module.exports = router