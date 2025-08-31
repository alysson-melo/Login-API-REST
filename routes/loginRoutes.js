const { Router } = require('express')
const router = Router()
const loginController = require("../controllers/loginController")

router.post("/users", (req, res) => {
    const response = loginController.create()
    res.send(response)
})

router.get("/users", async (req, res) => {
    try {
        const listUsers = await loginController.read()
        res.status(200).json(listUsers)
    }
    catch (error) {
        res.status(400).json({error: error.message || error})
    }
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